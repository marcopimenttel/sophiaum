# PROMPT — Convite Digital Interativo de Aniversário (15 anos)

Copie e cole este prompt inteiro na sua IDE com IA (Cursor, Windsurf, Claude Code, etc).

---

## 1. VISÃO GERAL DO PROJETO

Crie uma aplicação web (SPA) que funciona como convite digital interativo para uma festa de 15 anos. O site deve ser bonito, moderno, minimalista, com toque romântico/pastel, animações elegantes e experiência mobile-first (a maioria dos acessos será via WhatsApp no celular).

O projeto tem duas partes:
1. **Área pública**: o convite em si, com galeria de fotos, informações do evento, botões de ação (localização e WhatsApp) e formulário de confirmação de presença (RSVP).
2. **Área administrativa**: painel protegido por login (Supabase Auth) para a aniversariante/família visualizar, filtrar e exportar a lista de confirmados.

---

## 2. STACK TÉCNICA (obrigatória)

- **Frontend**: React 18+ com TypeScript
- **Estilização**: Tailwind CSS (com tema customizado no `tailwind.config`)
- **Animações**: Framer Motion (transições, scroll reveal, micro-interações)
- **Backend/Banco de dados**: Supabase (Postgres + Supabase Auth + Row Level Security)
- **Build tool**: Vite
- **Ícones**: lucide-react
- **Deploy final**: build estático (Vite build) hospedado em VPS (Nginx servindo os arquivos), então estruture o projeto pensando em `npm run build` gerando uma pasta `dist/` pronta para deploy, e documente no README os passos de deploy com Nginx.
- **Roteamento**: React Router (pelo menos 2 rotas: `/` público e `/admin` protegida)

---

## 3. DESIGN SYSTEM (definir isso ANTES de codar qualquer componente)

Crie um arquivo de design tokens (`src/styles/tokens.ts` ou configurado direto no `tailwind.config.ts`) com:

### 3.1 Paleta de cores — Pastel Romântico
- **Primária**: rosa suave (ex.: `#F7C6D9` a `#E8A0BF` em variações de 50–900)
- **Secundária**: lilás/lavanda (ex.: `#D8C7F0` a `#B79CE0`)
- **Neutros**: off-white/creme para fundos (`#FFF9FB`), cinza-rosado para textos secundários
- **Destaque/CTA**: um tom mais vibrante de rosa ou dourado suave para botões principais
- Definir escalas de 50 a 900 para cada cor no Tailwind (`primary`, `secondary`, `accent`, `neutral`)

### 3.2 Tipografia
- **Fonte de destaque (títulos, nome, números)**: uma fonte script/caligráfica delicada (ex.: "Great Vibes", "Dancing Script" ou "Playfair Display Italic") via Google Fonts
- **Fonte de apoio (corpo de texto, formulário)**: uma sans-serif limpa e legível (ex.: "Poppins", "Nunito" ou "Quicksand")
- Definir escala tipográfica (tamanhos para h1, h2, h3, body, small) responsiva com `clamp()`

### 3.3 Espaçamento e grid
- Base de espaçamento em múltiplos de 4px (padrão Tailwind)
- Mobile-first: todo componente desenhado primeiro para 375px de largura, depois breakpoints `sm`, `md`, `lg`
- Container central com `max-width` para não esticar demais em desktop (tratar desktop como "bônus", não prioridade)

### 3.4 Componentes base reutilizáveis
Criar como componentes isolados e documentados (podem ir em `src/components/ui/`):
- `Button` (variantes: primary, outline, whatsapp)
- `Card`
- `SectionTitle` (título com fonte script + underline decorativo animado)
- `Input`, `TextArea`, `RadioGroup` (para o formulário RSVP)
- `Modal` / `Toast` (para feedback de confirmação enviada)
- `Loader` (elegante, sutil, condizente com o tema)

### 3.5 Padrões de animação (Framer Motion)
- Fade + slide-up ao entrar elementos na viewport (scroll reveal)
- Efeito parallax leve nas fotos de fundo
- Transição suave entre seções
- Micro-interação nos botões (scale on tap/hover)
- Contagem regressiva animada (dias/horas/minutos até o evento)

---

## 4. ESTRUTURA DE SEÇÕES DA PÁGINA PÚBLICA (`/`)

1. **Hero / Abertura**
   - Foto de fundo em destaque (com overlay gradiente rosa/lilás translúcido para garantir legibilidade do texto)
   - Nome da aniversariante em fonte script grande
   - "15 anos" / data do evento
   - Animação de entrada elegante (fade + reveal de letras)
   - Scroll indicator sutil

2. **Contagem Regressiva**
   - Countdown animado (dias, horas, minutos, segundos) até a data/hora da festa

3. **Galeria de Fotos**
   - Grid ou carrossel de fotos da aniversariante
   - Efeito hover/tap com leve zoom e sombra
   - Lightbox ao clicar (foto em tela cheia)

4. **Detalhes do Evento**
   - Data, horário, local (nome do espaço/endereço)
   - Botão "Ver no mapa" → abre link do Google Maps (parametrizável via variável de ambiente ou config)
   - Botão "Chamar no WhatsApp" → abre `https://wa.me/<numero>` com mensagem pré-formatada

5. **Confirmação de Presença (RSVP)** — pública
   Formulário com os campos:
   - Nome completo (obrigatório)
   - WhatsApp/telefone (obrigatório, com máscara de formatação)
   - Vai levar acompanhante? (sim/não) → se sim, campo "quantos acompanhantes" e opcionalmente "nome dos acompanhantes"
   - Botão "Confirmar presença" com estado de loading e feedback de sucesso (toast/modal animado, algo como "Confirmado! Nos vemos lá 💕")
   - Validação de formulário (campos obrigatórios, formato de telefone)
   - Tratamento de erro (ex.: falha de conexão com Supabase)

6. **Footer**
   - Mensagem de despedida carinhosa
   - Ícones/redes sociais opcionais

---

## 5. ÁREA ADMINISTRATIVA (`/admin`)

### 5.1 Autenticação
- Login com email/senha via **Supabase Auth**
- Rota `/admin` protegida: se não autenticado, redireciona para `/admin/login`
- Tela de login simples, mesmo design system, sem excesso de elementos
- Botão de logout visível no painel

### 5.2 Painel de confirmados
- Tabela/lista com todos os RSVPs: nome, WhatsApp, acompanhantes, data/hora da confirmação
- Contador no topo: "Total confirmados: X pessoas" (somando titulares + acompanhantes)
- Busca/filtro por nome
- Ordenação por data de confirmação
- Botão para exportar lista em CSV
- Opção de excluir uma confirmação (com modal de confirmação antes de excluir)
- Responsivo, mas pode assumir uso também em desktop/tablet (área administrativa não precisa ser mobile-first estrita)

---

## 6. MODELAGEM NO SUPABASE

Crie o schema SQL para a tabela de confirmações, por exemplo:

```sql
create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  whatsapp text not null,
  tem_acompanhante boolean not null default false,
  quantidade_acompanhantes int default 0,
  nomes_acompanhantes text,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

-- Qualquer pessoa pode inserir (confirmar presença)
create policy "Permitir insert publico"
on public.rsvps for insert
to anon
with check (true);

-- Apenas usuários autenticados podem ler/editar/excluir
create policy "Permitir select para autenticados"
on public.rsvps for select
to authenticated
using (true);

create policy "Permitir delete para autenticados"
on public.rsvps for delete
to authenticated
using (true);
```

Configurar as variáveis de ambiente do Supabase via `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), nunca hardcoded no código.

---

## 7. ESTRUTURA DE PASTAS SUGERIDA

```
src/
  components/
    ui/              → componentes base (Button, Card, Input, etc.)
    sections/        → Hero, Countdown, Gallery, EventDetails, RsvpForm, Footer
    admin/           → LoginForm, RsvpTable, AdminHeader
  hooks/             → useCountdown, useRsvps, useAuth
  lib/               → supabaseClient.ts
  pages/             → Home.tsx, AdminLogin.tsx, AdminDashboard.tsx
  routes/            → AppRoutes.tsx, ProtectedRoute.tsx
  styles/            → tokens.ts, globals.css
  types/             → rsvp.types.ts
  assets/            → fotos (ou pasta public/images se preferir servir estático)
```

---

## 8. REQUISITOS NÃO FUNCIONAIS

- Mobile-first obrigatório: testar e desenhar tudo primeiro em viewport de celular
- Performance: lazy loading de imagens, otimização de imagens (usar `loading="lazy"`, formatos modernos se possível)
- Acessibilidade básica: contraste adequado de texto sobre fotos, labels em inputs, foco visível
- SEO básico/Open Graph: title, description e imagem de preview para quando o link for compartilhado no WhatsApp
- Código organizado, tipado (TypeScript estrito), componentizado e comentado onde necessário
- README com instruções de:
  - Como configurar variáveis de ambiente do Supabase
  - Como rodar localmente (`npm install`, `npm run dev`)
  - Como gerar build (`npm run build`)
  - Passos básicos de deploy em VPS com Nginx

---

## 9. ENTREGA ESPERADA

Comece pela configuração do projeto (Vite + TS + Tailwind + Supabase client) e pelo Design System (tokens de cor, tipografia, componentes base). Só depois construa as seções da página pública, e por último a área administrativa. Ao final, revise se tudo está mobile-first, com animações consistentes e sem inconsistências visuais entre as seções.

Se precisar de alguma informação que eu não passei (nome da aniversariante, data, endereço exato, número de WhatsApp de contato), pare e me pergunte antes de prosseguir com dados fictícios definitivos — use placeholders claros no código.
