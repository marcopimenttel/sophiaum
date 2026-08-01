# 15 Anos — Bárbara Sophia 🎉

Convite digital interativo para a festa de 15 anos da Bárbara Sophia Gomes da Silva.

## 🛠 Stack Técnica

- **React 19** + **TypeScript**
- **Vite 8** (build tool)
- **Tailwind CSS v4** (estilização)
- **Framer Motion** (animações)
- **Swiper** (carrossel de fotos)
- **Supabase** (Auth + Postgres + RLS)
- **React Router** (roteamento SPA)
- **Lucide React** (ícones)

## 📋 Funcionalidades

### Página Pública (`/`)
- Hero com foto de fundo e animações elegantes
- Contagem regressiva em tempo real
- Galeria de fotos com carrossel 3D e lightbox
- Detalhes do evento (data, hora, local)
- Botões de ação: Google Maps + WhatsApp
- Dress code
- Sugestões de presente
- Formulário de RSVP (confirmação de presença)

### Área Administrativa (`/admin`)
- Login com email/senha (Supabase Auth)
- Dashboard com estatísticas de confirmados
- Listagem de RSVPs com busca e filtro
- Exportação em CSV
- Exclusão de confirmações

## 🚀 Setup Local

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz com:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_anon_key_do_supabase
```

### 3. Rodar em desenvolvimento
```bash
npm run dev
```

### 4. Build para produção
```bash
npm run build
```

O build gera a pasta `dist/` pronta para deploy.

## 🌐 Deploy com Nginx (VPS)

### Configuração Nginx para SPA

```nginx
server {
    listen 80;
    server_name sophia.webmachri.com;

    root /var/www/sophiaum/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|webp|gif|ico|svg|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Passos de Deploy

1. Fazer build: `npm run build`
2. Copiar a pasta `dist/` para o servidor
3. Configurar o Nginx com o bloco acima
4. Reiniciar Nginx: `sudo nginx -s reload`

## 🔐 Credenciais Admin

- **Email:** admin@sophia.webmachri.com
- **Senha:** Sophia@2026! _(altere em produção)_

## 📁 Estrutura de Pastas

```
src/
  components/
    ui/          → Button, Input, Modal, Toast, etc.
    sections/    → Hero, Countdown, Gallery, etc.
    admin/       → LoginForm, RsvpTable, AdminHeader
  hooks/         → useCountdown, useRsvps, useAuth
  lib/           → Supabase client
  config/        → Dados do evento (configurável)
  pages/         → Home, AdminLogin, AdminDashboard
  routes/        → AppRoutes, ProtectedRoute
  styles/        → Design system (CSS)
  types/         → TypeScript interfaces
  utils/         → Máscaras, CSV export
```
