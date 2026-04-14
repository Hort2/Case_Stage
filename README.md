# ◈ Process Mapper

**Aplicação web full-stack para mapeamento e gestão de processos organizacionais, com foco em organização, visualização e escalabilidade.**

Em empresas de consultoria, é comum encontrar processos espalhados em planilhas, documentos e na cabeça das pessoas. O Process Mapper resolve isso: permite cadastrar áreas da empresa, organizar seus processos em uma árvore hierárquica visual e consultar tudo em um só lugar — de forma simples, rápida e sem complicação.

Desenvolvido como projeto prático durante minha formação em Engenharia de Software, com foco em aplicar conceitos de desenvolvimento full stack, organização de código e construção de interfaces funcionais.

---

## 📋 Funcionalidades

- **Landing page institucional** — apresentação do sistema e fluxo de uso
- **CRUD de áreas** — criação, edição e exclusão de departamentos
- **CRUD de processos e subprocessos**
- **Árvore hierárquica interativa** — visualização expansível com múltiplos níveis
- **Busca por nome com highlight**
- **Classificação por tipo e status**
- **Metadados por processo** — responsável, ferramentas e documentação
- **Modais reutilizáveis**
- **Confirmação antes de exclusões**
- **Seed de dados para demonstração**
- **API REST com JSON**

---

## 🛠️ Tecnologias

### Frontend
- React
- TypeScript
- React Router DOM
- Vite
- CSS

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- Zod

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- npm 9+

### Backend

cd backend
npm install
npx prisma migrate dev
npm run prisma:seed
npm run dev 

### Frontend

cd frontend  
npm install  
npm run dev  

- Backend: http://localhost:3333  
- Frontend: http://localhost:5173  

---

## ✨ Diferenciais do projeto

**Arquitetura organizada** — separação em camadas (controllers, services, repositories) facilita manutenção e escalabilidade.

**Componentização no frontend** — componentes reutilizáveis, como formulários que servem para criação e edição.

**Experiência do usuário (UX)** — interface limpa, ações contextuais, busca com destaque e feedback claro em exclusões.

**Árvore hierárquica escalável** — estrutura recursiva que suporta múltiplos níveis de processos.

**Validação em duas camadas** — frontend para usabilidade e backend com Zod para garantir integridade dos dados.

**Design system próprio** — uso de variáveis CSS para manter consistência visual.

---

## 🔮 Possíveis melhorias

- Autenticação e permissões de usuário
- Drag and drop na árvore
- Dashboard com métricas
- Exportação (PDF/imagem)
- Testes automatizados
- Deploy em nuvem
- Modo escuro

---

## 📌 Considerações finais

Este projeto demonstra minha capacidade de desenvolver uma aplicação completa, desde a modelagem de dados até a interface do usuário, com foco em organização, clareza de código e experiência do usuário.

---

## 👤 Autor

**Enzo Ramos**

link frontend: https://case-stage-mu.vercel.app/


---

Construído com TypeScript e dedicação ao aprendizado.
