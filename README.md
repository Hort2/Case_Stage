# ◈ Process Mapper

**Aplicação web full-stack para mapeamento e gestão de processos organizacionais.**

Em empresas de consultoria, é comum encontrar processos espalhados em planilhas, documentos e na cabeça das pessoas. O Process Mapper resolve isso: permite cadastrar áreas da empresa, organizar seus processos em uma árvore hierárquica visual e consultar tudo em um só lugar — de forma simples, rápida e sem complicação.

Desenvolvido como case técnico para processo seletivo de estágio.

---

## 📋 Funcionalidades

- **Landing page institucional** — apresentação do sistema com visão geral, funcionalidades e fluxo de uso
- **CRUD completo de áreas** — criar, editar e excluir departamentos/setores da empresa
- **CRUD completo de processos** — criar, editar e excluir processos e subprocessos
- **Árvore hierárquica interativa** — visualização expansível com profundidade ilimitada
- **Busca por nome** — filtro instantâneo com destaque visual (highlight) nos resultados
- **Classificação por tipo e status** — cada processo pode ser manual ou sistêmico, ativo ou inativo
- **Metadados por processo** — ferramentas utilizadas, responsável e documentação associada
- **Modais reutilizáveis** — o mesmo componente de formulário serve para criar e editar
- **Confirmação antes de excluir** — com aviso de quantos subprocessos serão removidos junto
- **Seed de dados** — banco pré-populado com dados realistas para demonstração imediata
- **API REST com JSON** — comunicação padronizada entre frontend e backend

---

## 🛠️ Tecnologias

### Frontend

| Tecnologia       | Função                          |
| ---------------- | ------------------------------- |
| React 19         | Biblioteca de interface         |
| TypeScript       | Tipagem estática                |
| React Router DOM | Navegação entre páginas (SPA)   |
| Vite             | Build tool e dev server         |
| CSS puro         | Estilização com design system próprio |

### Backend

| Tecnologia  | Função                                |
| ----------- | ------------------------------------- |
| Node.js     | Runtime do servidor                   |
| Express 5   | Framework HTTP para a API REST        |
| TypeScript  | Tipagem estática                      |
| Prisma ORM  | Acesso ao banco de dados              |
| SQLite      | Banco de dados leve e portátil        |
| Zod         | Validação de payloads de entrada      |

---

## 📁 Estrutura do projeto

```
Case_Stage/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Modelos Area e Process
│   │   ├── seed.ts                # Dados de demonstração
│   │   └── migrations/            # Histórico de migrações
│   └── src/
│       ├── controllers/           # Recebem a requisição e delegam
│       ├── services/              # Regras de negócio (buildTree, validações)
│       ├── repositories/          # Acesso ao banco via Prisma
│       ├── routes/                # Definição das rotas da API
│       ├── validators/            # Schemas Zod para create/update
│       ├── middlewares/           # Middleware de validação genérico
│       ├── types/                 # Tipos e constantes compartilhadas
│       ├── lib/prisma.ts          # Instância única do PrismaClient
│       ├── app.ts                 # Configuração do Express
│       └── server.ts              # Inicialização do servidor
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── LandingPage.tsx    # Página institucional
│       │   ├── HomePage.tsx       # Listagem e CRUD de áreas
│       │   └── AreaDetailPage.tsx # Árvore e CRUD de processos
│       ├── components/
│       │   ├── Header.tsx         # Header com navegação contextual
│       │   ├── ProcessTree.tsx    # Container da árvore
│       │   ├── ProcessNode.tsx    # Nó recursivo com expand e busca
│       │   ├── ProcessForm.tsx    # Modal para criar/editar processo
│       │   ├── AreaForm.tsx       # Modal para criar/editar área
│       │   ├── SearchBar.tsx      # Barra de busca com highlight
│       │   ├── StatusBadge.tsx    # Badge de status (ativo/inativo)
│       │   └── TypeIcon.tsx       # Indicador de tipo (manual/sistêmico)
│       ├── services/api.ts        # Camada de comunicação com a API
│       ├── types/index.ts         # Tipos, constantes e labels
│       ├── index.css              # Design system com variáveis CSS
│       ├── App.tsx                # Definição de rotas
│       └── main.tsx               # Entry point da aplicação
│
└── README.md
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd Case_Stage
```

### 2. Subir o backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

### 3. Subir o frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Rotas da aplicação

| Rota          | Página                            |
| ------------- | --------------------------------- |
| `/`           | Landing page institucional        |
| `/areas`      | Listagem e gerenciamento de áreas |
| `/areas/:id`  | Árvore de processos de uma área   |

---

## ✨ Diferenciais do projeto

**Arquitetura em camadas no backend** — o código segue o padrão Routes → Controllers → Services → Repositories, com separação clara de responsabilidades. Cada camada faz uma coisa só, o que facilita manutenção e testes.

**Componentização no frontend** — cada elemento visual é um componente isolado e reutilizável. Os formulários de área e de processo, por exemplo, funcionam tanto para criação quanto para edição com o mesmo componente.

**Design system próprio** — todas as cores, espaçamentos, bordas e sombras vêm de variáveis CSS centralizadas. Isso garante consistência visual sem precisar de uma biblioteca de UI externa.

**Experiência do usuário** — ações aparecem no hover para manter a interface limpa; a busca filtra instantaneamente com destaque visual; a confirmação de exclusão mostra o impacto (quantos subprocessos serão removidos); modais fecham ao clicar fora.

**Árvore com profundidade ilimitada** — o componente `ProcessNode` é recursivo e renderiza qualquer nível de hierarquia. A construção da árvore no backend é feita em O(n) com um único acesso ao banco.

**Validação em duas camadas** — Zod valida os payloads no backend antes de chegarem ao banco; o frontend valida campos obrigatórios e desabilita o botão de submit até o formulário estar válido.

**Dados realistas no seed** — o banco já vem populado com áreas, processos e subprocessos que simulam um cenário real de consultoria, facilitando a demonstração.

---

## 🔮 Possíveis melhorias futuras

- Autenticação e controle de acesso por perfil (admin, visualizador)
- Drag and drop para reorganizar processos na árvore
- Exportação da árvore em PDF ou imagem
- Filtros combinados por tipo, status e responsável
- Dashboard com métricas (total de processos por área, proporção manual/sistêmico)
- Testes automatizados (unitários no backend, integração no frontend)
- Deploy em ambiente cloud (Railway, Vercel)
- Modo escuro

---

## 👤 Autor

Desenvolvido por **Henrique Ort** como case técnico para processo seletivo de estágio.

---

<p align="center">
  <sub>Feito com TypeScript, café e vontade de aprender.</sub>
</p>
