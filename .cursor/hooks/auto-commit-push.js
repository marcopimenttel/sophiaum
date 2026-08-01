/**
 * Cursor stop hook: commit e push automático quando houver mudanças.
 * Nunca inclui .env / secrets. Falha de forma aberta (não bloqueia o agente).
 */
const { execSync } = require('child_process')
const fs = require('fs')

function run(cmd) {
  return execSync(cmd, {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trim()
}

function safeRun(cmd) {
  try {
    return run(cmd)
  } catch (err) {
    const stderr = err.stderr?.toString?.() || err.message || ''
    const stdout = err.stdout?.toString?.() || ''
    return { error: true, message: stderr || stdout || String(err) }
  }
}

// Consome stdin do hook (JSON do evento stop)
try {
  fs.readFileSync(0, 'utf8')
} catch {
  // ignore
}

try {
  const status = run('git status --porcelain')
  if (!status) {
    process.stdout.write(JSON.stringify({}))
    process.exit(0)
  }

  // Garante que .env nunca entre no stage
  safeRun('git reset HEAD -- .env .env.local 2>nul')

  const addResult = safeRun('git add -A')
  if (addResult?.error) {
    process.stdout.write(
      JSON.stringify({
        followup_message: `Auto-commit: falha ao adicionar arquivos — ${addResult.message}`,
      })
    )
    process.exit(0)
  }

  // Remove secrets se tiverem sido staged por engano
  safeRun('git reset HEAD -- .env .env.local 2>nul')

  const staged = run('git diff --cached --name-only')
  if (!staged) {
    process.stdout.write(JSON.stringify({}))
    process.exit(0)
  }

  const stamp = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const msg = `chore: auto-commit ${stamp}`

  const commitResult = safeRun(`git commit -m "${msg}"`)
  if (commitResult?.error) {
    process.stdout.write(
      JSON.stringify({
        followup_message: `Auto-commit: falha no commit — ${commitResult.message}`,
      })
    )
    process.exit(0)
  }

  const pushResult = safeRun('git push')
  if (pushResult?.error) {
    process.stdout.write(
      JSON.stringify({
        followup_message: `Commit feito, mas push falhou — ${pushResult.message}`,
      })
    )
    process.exit(0)
  }

  process.stdout.write(
    JSON.stringify({
      followup_message: `Alterações commitadas e enviadas ao GitHub (${stamp}).`,
    })
  )
  process.exit(0)
} catch (err) {
  process.stdout.write(JSON.stringify({}))
  process.exit(0)
}
