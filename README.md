# Content OS

Plataforma de organização e gestão de conteúdo para Social Medias, freelancers e pequenas agências.

> Seu conteúdo. Organizado do início ao fim.


Esta é a primeira versão do produto: uma aplicação **frontend completa**, com dados mockados e persistência em `localStorage`. Não há backend, banco de dados ou autenticação real — o foco é a experiência do produto e a qualidade da interface.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- [Zustand](https://zustand-demo.pmnd.rs/) (`persist` middleware) para estado e persistência
- [Framer Motion](https://www.framer.com/motion/) para animações
- [Radix UI](https://www.radix-ui.com/) como base dos componentes do Design System
- [dnd-kit](https://dndkit.com/) para drag & drop (Calendar e Kanban)

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). A landing page fica em `/`; a aplicação em si começa em `/dashboard`.

```bash
npm run build   # build de produção
npm run start   # roda o build de produção
npm run lint    # eslint
```

## Funcionalidades

- **Dashboard** — resumo do que está acontecendo: conteúdos em produção, aguardando aprovação, agendados e publicados; conteúdos recentes; aprovações pendentes; próximos conteúdos (Hoje/Amanhã); feed de atividades.
- **Content** — listagem em grid, lista ou Kanban, com busca e filtros combináveis (cliente, plataforma, status, campanha, responsável). Criação, edição, exclusão e página de detalhe (roteiro, legenda, hashtags, CTA, mídia, comentários e histórico).
- **Calendar** — visualização por mês, semana ou dia, com drag & drop para reagendar conteúdos.
- **Kanban** — board com as 7 etapas do fluxo editorial (Ideia → Roteiro → Produção → Edição → Aprovação → Agendado → Publicado), com drag & drop entre colunas.
- **Approvals** — fila de conteúdos aguardando aprovação e página de revisão (`/review/[id]`) para aprovar ou solicitar alteração.
- **Clients** e **Campaigns** — cadastro e gestão, com os conteúdos relacionados a cada um.
- **Settings** — workspace, perfil e preferências (formato de data, início da semana).
- **Landing page** — apresentação do produto (Hero, Problema, Solução, Workflow, Calendário, Colaboração, Aprovação, Analytics conceitual, CTA).

## Arquitetura

```
src/
├── app/                    # rotas (App Router)
│   ├── (app)/              # aplicação autenticada: sidebar + topbar
│   │   ├── dashboard/
│   │   ├── calendar/
│   │   ├── content/[id]?/
│   │   ├── campaigns/[id]?/
│   │   ├── clients/[id]?/
│   │   ├── approvals/
│   │   └── settings/
│   ├── review/[id]/        # página de aprovação, sem sidebar
│   └── page.tsx            # landing page
│
├── components/
│   ├── ui/                 # Design System (Button, Badge, Modal, Toast, ...)
│   ├── layout/              # Sidebar, Topbar, MobileNav, PageHeader
│   ├── content/, calendar/, kanban/, dashboard/, clients/, campaigns/, comments/, marketing/
│
├── data/                    # mock data (usuários, clientes, campanhas, conteúdos...)
├── store/                   # stores Zustand (um por entidade, com persist)
├── lib/
│   ├── storage/             # adapter único de localStorage usado pelos stores
│   ├── constants/            # status e plataformas (labels, ícones, cores)
│   └── utils/                 # cn, datas, ids, texto, gradientes
├── hooks/                    # useLocalStorage (preferências de UI)
└── types/                     # tipos e enums do domínio
```

### Persistência

Cada entidade (conteúdos, clientes, campanhas, comentários, atividades, configurações) tem seu próprio store Zustand com `persist`, gravando em uma chave própria do `localStorage` (`content-os-*`). Todo o acesso ao `localStorage` passa por um único adapter em `src/lib/storage/local-storage.ts` — se no futuro isso virar uma API real, só esse arquivo precisa mudar.

Os dados iniciais vêm de `src/data/mock-*.ts`. Na primeira visita, os stores usam esses mocks; a partir da primeira alteração, tudo passa a ser lido/gravado do `localStorage`, sobrevivendo a refresh da página.

Feito por [Lázaro Vasconcelos](mailto:lazaro.vasconcelos@sollydus.com.br).