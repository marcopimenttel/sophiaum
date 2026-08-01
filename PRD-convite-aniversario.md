# PRD — Convite Digital Interativo de Aniversário (15 anos)

**Versão:** 1.0
**Tipo de documento:** Product Requirements Document (PRD)
**Status:** Pronto para desenvolvimento

---

## 1. RESUMO EXECUTIVO

Desenvolver uma aplicação web (SPA) que funcione como convite digital de aniversário de 15 anos, com design moderno, minimalista e estilo pastel romântico. A aplicação deve permitir que convidados visualizem informações do evento, confirmem presença (RSVP) e acessem localização/WhatsApp com um toque. A família terá acesso a um painel administrativo protegido para acompanhar as confirmações em tempo real.

**Problema a resolver:** convites físicos ou mensagens de texto simples não comunicam a experiência e o cuidado da festa, e não centralizam as confirmações de presença de forma organizada.

**Solução proposta:** um site único (link compartilhável via WhatsApp) com experiência visual imersiva, contagem regressiva, galeria de fotos, formulário de RSVP e painel administrativo com dados em tempo real.

---

## 2. OBJETIVOS DO PRODUTO

| Objetivo | Métrica de sucesso |
|---|---|
| Facilitar a confirmação de presença | Taxa de conversão de acessos → RSVPs preenchidos |
| Centralizar dados dos convidados | 100% das confirmações registradas no banco, sem perda de dados |
| Proporcionar experiência visual marcante | Feedback qualitativo positivo da família/convidados |
| Permitir gestão simples da lista | Família consegue visualizar/exportar lista sem apoio técnico |
| Garantir bom uso no celular | 100% das funcionalidades operáveis em viewport de 375px |

---

## 3. PÚBLICO-ALVO / PERSONAS

### Persona 1 — Convidado(a)
- Acessa o link principalmente pelo WhatsApp, no celular
- Quer ver rapidamente: quando é, onde é, e confirmar presença
- Pouca paciência para formulários longos ou telas lentas

### Persona 2 — Administrador(a) (família/aniversariante)
- Acessa geralmente pelo computador ou celular
- Precisa ver quantas pessoas confirmaram, quem confirmou, e exportar essa lista
- Não é tecnicamente avançado(a) — a interface precisa ser simples e direta

---

## 4. ESCOPO DO PRODUTO

### 4.1 Dentro do escopo (V1)
- Página pública de convite (single page, com seções)
- Contagem regressiva até o evento
- Galeria de fotos com lightbox
- Botões de ação: localização (Google Maps) e WhatsApp
- Formulário de RSVP público (nome, WhatsApp, acompanhante)
- Painel administrativo autenticado (Supabase Auth)
- Listagem, busca, exportação (CSV) e exclusão de RSVPs
- Design system documentado (cores, tipografia, componentes)
- Responsividade mobile-first

### 4.2 Fora do escopo (V1)
- Envio automático de confirmação por e-mail/WhatsApp para o convidado
- Múltiplos eventos/convites na mesma aplicação (é um convite único)
- Sistema de convites individuais com nome pré-preenchido por link único
- Pagamentos ou lista de presentes integrada
- App mobile nativo
- Multilíngue

> Esses itens podem compor uma V2, mas não devem ser desenvolvidos agora.

---

## 5. REQUISITOS FUNCIONAIS

### RF01 — Página Hero
O sistema deve exibir uma seção inicial com foto de fundo, nome da aniversariante, "15 anos" e data do evento, com animação de entrada.

### RF02 — Contagem regressiva
O sistema deve calcular e exibir em tempo real (dias, horas, minutos, segundos) o tempo restante até a data/hora configurada do evento.

### RF03 — Galeria de fotos
O sistema deve exibir um conjunto de fotos em grid/carrossel, com abertura em tela cheia (lightbox) ao clicar/tocar.

### RF04 — Detalhes do evento
O sistema deve exibir data, horário e local do evento, com botão que abre a localização no Google Maps em nova aba.

### RF05 — Contato via WhatsApp
O sistema deve exibir um botão que abre uma conversa no WhatsApp (`wa.me`) com mensagem pré-preenchida, direcionado a um número configurável.

### RF06 — Formulário de RSVP (público)
O sistema deve permitir que qualquer visitante preencha:
- Nome completo (obrigatório)
- WhatsApp/telefone (obrigatório, com máscara)
- Se levará acompanhante (sim/não)
- Se sim: quantidade de acompanhantes (e opcionalmente nome deles)

O sistema deve validar os campos obrigatórios antes do envio e exibir feedback de sucesso ou erro.

### RF07 — Persistência de RSVP
O sistema deve salvar cada confirmação no banco de dados (Supabase), com data/hora de criação.

### RF08 — Autenticação administrativa
O sistema deve exigir login (e-mail/senha via Supabase Auth) para acessar a rota `/admin`. Usuários não autenticados devem ser redirecionados para a tela de login.

### RF09 — Painel de confirmados
O sistema deve exibir, para usuários autenticados:
- Lista de todos os RSVPs (nome, WhatsApp, acompanhantes, data de confirmação)
- Contador total de confirmados (titulares + acompanhantes)
- Campo de busca por nome
- Ordenação por data de confirmação

### RF10 — Exportação de dados
O sistema deve permitir exportar a lista de confirmados em formato CSV.

### RF11 — Exclusão de RSVP
O sistema deve permitir que o administrador exclua uma confirmação, mediante modal de confirmação antes da exclusão definitiva.

### RF12 — Logout
O sistema deve permitir que o administrador encerre a sessão a qualquer momento.

---

## 6. REQUISITOS NÃO FUNCIONAIS

| Categoria | Requisito |
|---|---|
| **Responsividade** | Mobile-first obrigatório; layout funcional a partir de 375px de largura |
| **Performance** | Lazy loading de imagens; carregamento inicial da página pública abaixo de ~3s em 4G |
| **Segurança** | RLS (Row Level Security) no Supabase: escrita pública apenas para inserção de RSVP; leitura/exclusão restritas a usuários autenticados |
| **Acessibilidade** | Contraste adequado de texto sobre imagens; labels em todos os campos de formulário; foco visível em elementos interativos |
| **SEO/Compartilhamento** | Meta tags Open Graph (title, description, imagem) para pré-visualização correta ao compartilhar o link no WhatsApp |
| **Manutenibilidade** | Código em TypeScript estrito, componentizado, com design tokens centralizados |
| **Disponibilidade** | Aplicação deve funcionar de forma estática após build, hospedável em qualquer VPS com Nginx |

---

## 7. STACK TÉCNICA

- **Frontend:** React 18+ com TypeScript, Vite
- **Estilização:** Tailwind CSS com tema customizado (design tokens)
- **Animações:** Framer Motion
- **Roteamento:** React Router
- **Backend/Dados:** Supabase (Postgres + Auth + RLS)
- **Ícones:** lucide-react
- **Deploy:** build estático (`npm run build`) servido via Nginx em VPS

---

## 8. MODELO DE DADOS (alto nível)

**Tabela `rsvps`**

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| id | uuid | sim | chave primária, gerada automaticamente |
| nome | text | sim | nome completo do convidado |
| whatsapp | text | sim | telefone com máscara |
| tem_acompanhante | boolean | sim | default `false` |
| quantidade_acompanhantes | int | não | default `0` |
| nomes_acompanhantes | text | não | opcional |
| created_at | timestamptz | sim | default `now()` |

**Políticas de acesso (RLS):**
- `INSERT`: permitido para usuários anônimos (qualquer visitante pode confirmar presença)
- `SELECT` e `DELETE`: restritos a usuários autenticados (administradores)

---

## 9. FLUXOS PRINCIPAIS (USER FLOWS)

### Fluxo 1 — Convidado confirma presença
1. Convidado recebe link pelo WhatsApp
2. Acessa o site, visualiza hero, contagem regressiva e fotos
3. Rola até a seção de detalhes do evento
4. Opcionalmente toca em "Ver no mapa" ou "Chamar no WhatsApp"
5. Preenche o formulário de RSVP
6. Recebe feedback visual de confirmação enviada com sucesso

### Fluxo 2 — Administrador consulta confirmados
1. Administrador acessa `/admin`
2. É redirecionado para tela de login (se não autenticado)
3. Faz login com e-mail/senha
4. Visualiza lista de confirmados, total de convidados, e pode buscar/filtrar
5. Exporta lista em CSV quando necessário
6. Pode excluir um registro incorreto/duplicado

---

## 10. CRITÉRIOS DE ACEITE (V1)

- [ ] Página pública carrega corretamente em dispositivos móveis (375px+)
- [ ] Contagem regressiva funciona corretamente e atualiza em tempo real
- [ ] Galeria de fotos abre em lightbox ao clicar
- [ ] Botão de localização abre o Google Maps corretamente
- [ ] Botão de WhatsApp abre conversa com mensagem pré-preenchida
- [ ] Formulário de RSVP valida campos obrigatórios e impede envio incompleto
- [ ] RSVP enviado é persistido corretamente no Supabase
- [ ] Usuário não autenticado não consegue acessar `/admin`
- [ ] Login administrativo funciona via Supabase Auth
- [ ] Painel admin lista corretamente todos os RSVPs com contagem total
- [ ] Exportação CSV gera arquivo válido com todos os registros
- [ ] Exclusão de RSVP exige confirmação antes de executar
- [ ] Design system (cores, tipografia, componentes) é consistente em todas as telas

---

## 11. RISCOS E MITIGAÇÕES

| Risco | Impacto | Mitigação |
|---|---|---|
| Exposição da tabela de RSVPs sem RLS configurada corretamente | Alto (vazamento de dados de convidados) | Testar políticas RLS antes de publicar; nunca expor `service_role key` no frontend |
| Baixa performance por imagens pesadas no fundo | Médio (experiência ruim em 4G) | Otimizar/comprimir imagens, usar lazy loading |
| Convidado sem paciência para preencher formulário longo | Médio (baixa taxa de RSVP) | Manter formulário curto, com poucos campos obrigatórios |
| Link do WhatsApp com número errado/desatualizado | Baixo | Centralizar número em variável de ambiente/configuração |

---

## 12. FORA DE ESCOPO / PRÓXIMOS PASSOS (V2 — ideias futuras)

- Envio automático de confirmação via WhatsApp/e-mail para o convidado
- Convites individuais com nome pré-preenchido por link único (rastreamento por convidado)
- Lista de presentes integrada
- Painel com gráficos (ex.: evolução de confirmações ao longo do tempo)

---

## 13. REFERÊNCIA TÉCNICA COMPLEMENTAR

Este PRD deve ser utilizado em conjunto com o **prompt técnico de implementação** (`prompt-convite-aniversario.md`), que já define o design system detalhado (paleta pastel rosa/lilás, tipografia, componentes), estrutura de pastas, schema SQL e requisitos de codificação. Use o PRD para entender **o quê** e **por quê** construir, e o prompt técnico para orientar **como** construir.
