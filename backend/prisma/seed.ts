import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Limpa dados existentes para permitir re-execução
  await prisma.process.deleteMany();
  await prisma.area.deleteMany();

  console.log("Dados anteriores removidos.");

  // ─── Área: Pessoas ───────────────────────────────────────────────

  const pessoas = await prisma.area.create({
    data: {
      name: "Pessoas",
      description: "Gestão de pessoas, recrutamento, desenvolvimento e desligamento de colaboradores",
    },
  });

  // Processo: Recrutamento e Seleção
  const recrutamento = await prisma.process.create({
    data: {
      name: "Recrutamento e Seleção",
      description: "Processo completo de atração, triagem e contratação de talentos",
      type: "manual",
      status: "active",
      tools: "Trello, Notion",
      responsible: "Equipe de Recrutamento",
      documentation: "Fluxo de recrutamento, guias de entrevista",
      areaId: pessoas.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Definição de perfil da vaga",
        description: "Levantamento de requisitos técnicos e comportamentais da posição",
        type: "manual",
        status: "active",
        tools: "Notion",
        responsible: "Gestor da área solicitante",
        documentation: "Template de descrição de vaga",
        areaId: pessoas.id,
        parentId: recrutamento.id,
      },
      {
        name: "Divulgação da vaga",
        description: "Publicação em canais de recrutamento e redes sociais",
        type: "systemic",
        status: "active",
        tools: "LinkedIn, Gupy",
        responsible: "Analista de RH",
        documentation: "Guia de canais de divulgação",
        areaId: pessoas.id,
        parentId: recrutamento.id,
      },
      {
        name: "Triagem de currículos",
        description: "Análise e filtragem inicial dos candidatos recebidos",
        type: "systemic",
        status: "active",
        tools: "Gupy, Planilhas Google",
        responsible: "Analista de RH",
        documentation: "Critérios de triagem por nível",
        areaId: pessoas.id,
        parentId: recrutamento.id,
      },
      {
        name: "Entrevistas",
        description: "Entrevistas técnicas e comportamentais com os candidatos selecionados",
        type: "manual",
        status: "active",
        tools: "Google Meet, Notion",
        responsible: "Equipe de Recrutamento e Gestor",
        documentation: "Roteiro de entrevista, scorecard de avaliação",
        areaId: pessoas.id,
        parentId: recrutamento.id,
      },
      {
        name: "Oferta de contratação",
        description: "Elaboração e envio da proposta formal ao candidato aprovado",
        type: "manual",
        status: "active",
        tools: "E-mail, DocuSign",
        responsible: "Coordenador de RH",
        documentation: "Template de proposta, política salarial",
        areaId: pessoas.id,
        parentId: recrutamento.id,
      },
    ],
  });

  // Processo: Avaliação de Performance
  const avaliacao = await prisma.process.create({
    data: {
      name: "Avaliação de Performance",
      description: "Ciclo de avaliação de desempenho dos colaboradores",
      type: "manual",
      status: "active",
      tools: "Notion, Planilhas Google",
      responsible: "Equipe de RH e Gestores",
      documentation: "Modelo de avaliação, relatórios de feedback",
      areaId: pessoas.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Definição de critérios de avaliação",
        description: "Estabelecimento de metas e indicadores de desempenho por cargo",
        type: "manual",
        status: "active",
        tools: "Notion",
        responsible: "RH e Diretoria",
        documentation: "Matriz de competências",
        areaId: pessoas.id,
        parentId: avaliacao.id,
      },
      {
        name: "Aplicação de avaliações trimestrais",
        description: "Coleta de avaliações 360° via formulários digitais",
        type: "systemic",
        status: "active",
        tools: "Google Forms, Planilhas Google",
        responsible: "Analista de RH",
        documentation: "Calendário de avaliações, templates de formulário",
        areaId: pessoas.id,
        parentId: avaliacao.id,
      },
      {
        name: "Feedbacks",
        description: "Reuniões individuais de devolutiva entre gestor e colaborador",
        type: "manual",
        status: "active",
        tools: "Google Meet, Notion",
        responsible: "Gestores diretos",
        documentation: "Guia de feedback construtivo",
        areaId: pessoas.id,
        parentId: avaliacao.id,
      },
    ],
  });

  // Processo: Desligamento
  const desligamento = await prisma.process.create({
    data: {
      name: "Desligamento",
      description: "Processo formal de encerramento de vínculo com o colaborador",
      type: "manual",
      status: "active",
      tools: "Sistema de folha de pagamento, Trello",
      responsible: "Departamento de RH e Administrativo",
      documentation: "Procedimentos de desligamento, formulários de rescisão",
      areaId: pessoas.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Notificação formal de desligamento",
        description: "Comunicação oficial ao colaborador com os termos do desligamento",
        type: "manual",
        status: "active",
        tools: "E-mail, documento físico",
        responsible: "Gestor direto e RH",
        documentation: "Modelo de carta de desligamento",
        areaId: pessoas.id,
        parentId: desligamento.id,
      },
      {
        name: "Processamento da rescisão",
        description: "Cálculos rescisórios e geração de documentos legais",
        type: "systemic",
        status: "active",
        tools: "Sistema de folha de pagamento",
        responsible: "Departamento Pessoal",
        documentation: "Checklist de rescisão, guia trabalhista",
        areaId: pessoas.id,
        parentId: desligamento.id,
      },
      {
        name: "Devolução de equipamentos",
        description: "Recolhimento de notebooks, crachás e acessos do colaborador",
        type: "manual",
        status: "active",
        tools: "Trello, planilha de ativos",
        responsible: "TI e Administrativo",
        documentation: "Lista de ativos por colaborador",
        areaId: pessoas.id,
        parentId: desligamento.id,
      },
    ],
  });

  // ─── Área: Financeiro ────────────────────────────────────────────

  const financeiro = await prisma.area.create({
    data: {
      name: "Financeiro",
      description: "Gestão financeira, contas a pagar, faturamento e controle orçamentário",
    },
  });

  // Processo: Contas a Pagar
  const contasPagar = await prisma.process.create({
    data: {
      name: "Contas a Pagar",
      description: "Gerenciamento de obrigações financeiras da empresa",
      type: "manual",
      status: "active",
      tools: "ERP, Planilhas Google",
      responsible: "Equipe Financeira",
      documentation: "Política de pagamentos, fluxo de aprovação",
      areaId: financeiro.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Recebimento de notas fiscais",
        description: "Entrada e registro de notas fiscais de fornecedores no sistema",
        type: "systemic",
        status: "active",
        tools: "ERP, e-mail",
        responsible: "Assistente Financeiro",
        documentation: "Procedimento de entrada de NF",
        areaId: financeiro.id,
        parentId: contasPagar.id,
      },
      {
        name: "Aprovação de pagamentos",
        description: "Validação e autorização de pagamentos conforme alçada",
        type: "manual",
        status: "active",
        tools: "ERP, e-mail",
        responsible: "Coordenador Financeiro",
        documentation: "Matriz de alçadas de aprovação",
        areaId: financeiro.id,
        parentId: contasPagar.id,
      },
      {
        name: "Execução de pagamentos",
        description: "Processamento bancário dos pagamentos aprovados",
        type: "systemic",
        status: "active",
        tools: "Internet Banking, ERP",
        responsible: "Analista Financeiro",
        documentation: "Procedimento de pagamento bancário",
        areaId: financeiro.id,
        parentId: contasPagar.id,
      },
    ],
  });

  // Processo: Faturamento
  const faturamento = await prisma.process.create({
    data: {
      name: "Faturamento",
      description: "Emissão de faturas e controle de recebíveis",
      type: "systemic",
      status: "active",
      tools: "ERP, sistema de NF-e",
      responsible: "Equipe de Faturamento",
      documentation: "Manual de faturamento, regras fiscais",
      areaId: financeiro.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Emissão de notas fiscais",
        description: "Geração e envio de NF-e para clientes conforme contratos",
        type: "systemic",
        status: "active",
        tools: "Sistema de NF-e, ERP",
        responsible: "Analista de Faturamento",
        documentation: "Regras de emissão por tipo de serviço",
        areaId: financeiro.id,
        parentId: faturamento.id,
      },
      {
        name: "Controle de inadimplência",
        description: "Acompanhamento de faturas vencidas e ações de cobrança",
        type: "manual",
        status: "active",
        tools: "ERP, Planilhas Google, e-mail",
        responsible: "Analista Financeiro",
        documentation: "Política de cobrança, scripts de contato",
        areaId: financeiro.id,
        parentId: faturamento.id,
      },
    ],
  });

  // ─── Resumo ──────────────────────────────────────────────────────

  const areaCount = await prisma.area.count();
  const processCount = await prisma.process.count();

  console.log(`Seed concluído: ${areaCount} áreas e ${processCount} processos criados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
