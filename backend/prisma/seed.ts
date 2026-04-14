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

  // ─── Área: Tecnologia da Informação ─────────────────────────────

  const ti = await prisma.area.create({
    data: {
      name: "Tecnologia da Informação",
      description: "Infraestrutura, sistemas internos, suporte técnico e segurança da informação",
    },
  });

  // Processo: Gestão de Acessos
  const acessos = await prisma.process.create({
    data: {
      name: "Gestão de Acessos",
      description: "Controle de permissões e credenciais dos colaboradores nos sistemas da empresa",
      type: "systemic",
      status: "active",
      tools: "Active Directory, Google Workspace Admin",
      responsible: "Equipe de Infraestrutura",
      documentation: "Política de acessos, matriz de permissões por cargo",
      areaId: ti.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Provisionamento de novo colaborador",
        description: "Criação de contas, e-mail corporativo e acessos iniciais para novos funcionários",
        type: "systemic",
        status: "active",
        tools: "Google Workspace Admin, Active Directory",
        responsible: "Analista de Infraestrutura",
        documentation: "Checklist de onboarding técnico",
        areaId: ti.id,
        parentId: acessos.id,
      },
      {
        name: "Revogação de acessos",
        description: "Remoção de permissões e desativação de contas de colaboradores desligados",
        type: "systemic",
        status: "active",
        tools: "Active Directory, Trello",
        responsible: "Analista de Infraestrutura",
        documentation: "Procedimento de offboarding técnico",
        areaId: ti.id,
        parentId: acessos.id,
      },
      {
        name: "Revisão periódica de permissões",
        description: "Auditoria trimestral das permissões ativas em todos os sistemas",
        type: "manual",
        status: "active",
        tools: "Planilhas Google, Active Directory",
        responsible: "Coordenador de TI",
        documentation: "Relatório de auditoria de acessos",
        areaId: ti.id,
        parentId: acessos.id,
      },
    ],
  });

  // Processo: Suporte Técnico
  const suporte = await prisma.process.create({
    data: {
      name: "Suporte Técnico",
      description: "Atendimento e resolução de chamados técnicos internos",
      type: "manual",
      status: "active",
      tools: "Jira Service Desk, Slack",
      responsible: "Equipe de Suporte",
      documentation: "SLA de atendimento, base de conhecimento",
      areaId: ti.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Abertura e triagem de chamados",
        description: "Registro do chamado e classificação por prioridade e categoria",
        type: "systemic",
        status: "active",
        tools: "Jira Service Desk",
        responsible: "Analista de Suporte N1",
        documentation: "Categorias de chamados, critérios de prioridade",
        areaId: ti.id,
        parentId: suporte.id,
      },
      {
        name: "Resolução e escalonamento",
        description: "Atendimento direto ou encaminhamento para nível técnico superior",
        type: "manual",
        status: "active",
        tools: "Jira Service Desk, AnyDesk",
        responsible: "Analista de Suporte N1/N2",
        documentation: "Procedimentos de resolução por tipo de incidente",
        areaId: ti.id,
        parentId: suporte.id,
      },
      {
        name: "Pesquisa de satisfação pós-atendimento",
        description: "Envio automático de formulário de avaliação após fechamento do chamado",
        type: "systemic",
        status: "active",
        tools: "Google Forms, Jira",
        responsible: "Coordenador de Suporte",
        documentation: "Template da pesquisa, relatório mensal de NPS",
        areaId: ti.id,
        parentId: suporte.id,
      },
    ],
  });

  // Processo: Manutenção de Sistemas
  const manutencao = await prisma.process.create({
    data: {
      name: "Manutenção de Sistemas",
      description: "Atualizações, correções e melhorias nos sistemas internos da empresa",
      type: "systemic",
      status: "active",
      tools: "GitHub, Jenkins, Docker",
      responsible: "Equipe de Desenvolvimento",
      documentation: "Guia de deploy, changelog de versões",
      areaId: ti.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Planejamento de releases",
        description: "Definição de escopo e cronograma das próximas versões",
        type: "manual",
        status: "active",
        tools: "Jira, Notion",
        responsible: "Tech Lead",
        documentation: "Roadmap de produto, backlog priorizado",
        areaId: ti.id,
        parentId: manutencao.id,
      },
      {
        name: "Deploy em produção",
        description: "Publicação de novas versões no ambiente de produção com validação",
        type: "systemic",
        status: "active",
        tools: "GitHub Actions, Docker, AWS",
        responsible: "DevOps",
        documentation: "Runbook de deploy, checklist pré-produção",
        areaId: ti.id,
        parentId: manutencao.id,
      },
    ],
  });

  // ─── Área: Comercial ──────────────────────────────────────────────

  const comercial = await prisma.area.create({
    data: {
      name: "Comercial",
      description: "Prospecção de clientes, gestão de propostas e acompanhamento de vendas",
    },
  });

  // Processo: Prospecção de Clientes
  const prospeccao = await prisma.process.create({
    data: {
      name: "Prospecção de Clientes",
      description: "Identificação e abordagem de potenciais clientes para a empresa",
      type: "manual",
      status: "active",
      tools: "HubSpot, LinkedIn Sales Navigator",
      responsible: "Equipe Comercial",
      documentation: "Playbook de vendas, perfil de cliente ideal (ICP)",
      areaId: comercial.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Pesquisa de mercado e leads",
        description: "Mapeamento de empresas-alvo e coleta de contatos qualificados",
        type: "manual",
        status: "active",
        tools: "LinkedIn Sales Navigator, Apollo",
        responsible: "SDR (Sales Development Representative)",
        documentation: "Critérios de qualificação de leads",
        areaId: comercial.id,
        parentId: prospeccao.id,
      },
      {
        name: "Primeiro contato (cold outreach)",
        description: "Envio de e-mails e mensagens personalizadas para potenciais clientes",
        type: "manual",
        status: "active",
        tools: "HubSpot, e-mail",
        responsible: "SDR",
        documentation: "Templates de abordagem, cadência de follow-up",
        areaId: comercial.id,
        parentId: prospeccao.id,
      },
      {
        name: "Qualificação de oportunidades",
        description: "Avaliação do potencial de conversão e registro no CRM",
        type: "systemic",
        status: "active",
        tools: "HubSpot CRM",
        responsible: "SDR e Executivo de Contas",
        documentation: "Critérios BANT, pipeline de qualificação",
        areaId: comercial.id,
        parentId: prospeccao.id,
      },
    ],
  });

  // Processo: Gestão de Propostas
  const propostas = await prisma.process.create({
    data: {
      name: "Gestão de Propostas",
      description: "Elaboração, envio e acompanhamento de propostas comerciais",
      type: "manual",
      status: "active",
      tools: "Google Docs, HubSpot, DocuSign",
      responsible: "Executivo de Contas",
      documentation: "Modelo de proposta, tabela de preços",
      areaId: comercial.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Elaboração de proposta técnica e comercial",
        description: "Montagem do documento com escopo, prazos e valores",
        type: "manual",
        status: "active",
        tools: "Google Docs, Notion",
        responsible: "Executivo de Contas e Pré-vendas",
        documentation: "Template de proposta, regras de precificação",
        areaId: comercial.id,
        parentId: propostas.id,
      },
      {
        name: "Negociação e ajustes",
        description: "Rodadas de negociação com o cliente até o fechamento",
        type: "manual",
        status: "active",
        tools: "Google Meet, e-mail, HubSpot",
        responsible: "Executivo de Contas",
        documentation: "Guia de objeções, limites de desconto",
        areaId: comercial.id,
        parentId: propostas.id,
      },
      {
        name: "Assinatura de contrato",
        description: "Formalização do acordo com assinatura digital",
        type: "systemic",
        status: "active",
        tools: "DocuSign, Google Drive",
        responsible: "Executivo de Contas e Jurídico",
        documentation: "Modelo de contrato, checklist pré-assinatura",
        areaId: comercial.id,
        parentId: propostas.id,
      },
    ],
  });

  // ─── Área: Jurídico ───────────────────────────────────────────────

  const juridico = await prisma.area.create({
    data: {
      name: "Jurídico",
      description: "Contratos, compliance, consultoria jurídica e gestão de riscos legais",
    },
  });

  // Processo: Gestão de Contratos
  const contratos = await prisma.process.create({
    data: {
      name: "Gestão de Contratos",
      description: "Elaboração, revisão e controle de contratos com clientes, fornecedores e parceiros",
      type: "manual",
      status: "active",
      tools: "Google Drive, DocuSign, Planilhas Google",
      responsible: "Equipe Jurídica",
      documentation: "Modelos de contrato, política de revisão",
      areaId: juridico.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Elaboração de minutas",
        description: "Redação inicial do contrato com base no modelo padrão e demandas específicas",
        type: "manual",
        status: "active",
        tools: "Google Docs",
        responsible: "Advogado Corporativo",
        documentation: "Templates por tipo de contrato",
        areaId: juridico.id,
        parentId: contratos.id,
      },
      {
        name: "Revisão e aprovação interna",
        description: "Análise jurídica e validação por alçada antes do envio ao cliente",
        type: "manual",
        status: "active",
        tools: "Google Docs, e-mail",
        responsible: "Coordenador Jurídico",
        documentation: "Checklist de revisão contratual",
        areaId: juridico.id,
        parentId: contratos.id,
      },
      {
        name: "Controle de vigência e renovações",
        description: "Acompanhamento de prazos de vencimento e alertas de renovação",
        type: "systemic",
        status: "active",
        tools: "Planilhas Google, Google Calendar",
        responsible: "Assistente Jurídico",
        documentation: "Planilha de controle de contratos ativos",
        areaId: juridico.id,
        parentId: contratos.id,
      },
    ],
  });

  // Processo: Compliance e Conformidade
  const compliance = await prisma.process.create({
    data: {
      name: "Compliance e Conformidade",
      description: "Garantia de conformidade legal e regulatória nas operações da empresa",
      type: "manual",
      status: "active",
      tools: "Notion, Planilhas Google",
      responsible: "Analista de Compliance",
      documentation: "Política de compliance, código de conduta",
      areaId: juridico.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Mapeamento de obrigações regulatórias",
        description: "Levantamento e atualização das normas aplicáveis ao negócio",
        type: "manual",
        status: "active",
        tools: "Notion",
        responsible: "Analista de Compliance",
        documentation: "Matriz regulatória, calendário de obrigações",
        areaId: juridico.id,
        parentId: compliance.id,
      },
      {
        name: "Treinamentos de conformidade",
        description: "Capacitação periódica dos colaboradores sobre normas e políticas internas",
        type: "manual",
        status: "inactive",
        tools: "Google Meet, Google Slides",
        responsible: "Equipe Jurídica e RH",
        documentation: "Material de treinamento, lista de presença",
        areaId: juridico.id,
        parentId: compliance.id,
      },
      {
        name: "Auditoria interna",
        description: "Verificação periódica do cumprimento das políticas e processos",
        type: "manual",
        status: "active",
        tools: "Planilhas Google, Notion",
        responsible: "Coordenador Jurídico",
        documentation: "Roteiro de auditoria, relatório de findings",
        areaId: juridico.id,
        parentId: compliance.id,
      },
    ],
  });

  // ─── Área: Marketing ──────────────────────────────────────────────

  const marketing = await prisma.area.create({
    data: {
      name: "Marketing",
      description: "Branding, comunicação, marketing digital e geração de demanda",
    },
  });

  // Processo: Marketing de Conteúdo
  const conteudo = await prisma.process.create({
    data: {
      name: "Marketing de Conteúdo",
      description: "Planejamento e produção de conteúdo para atração e engajamento de leads",
      type: "manual",
      status: "active",
      tools: "Notion, WordPress, Canva",
      responsible: "Equipe de Marketing",
      documentation: "Calendário editorial, guia de tom de voz",
      areaId: marketing.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Planejamento editorial",
        description: "Definição de pautas, formatos e calendário mensal de publicações",
        type: "manual",
        status: "active",
        tools: "Notion, Google Calendar",
        responsible: "Coordenador de Marketing",
        documentation: "Template de calendário editorial",
        areaId: marketing.id,
        parentId: conteudo.id,
      },
      {
        name: "Produção de artigos e posts",
        description: "Redação, revisão e diagramação de conteúdos para blog e redes sociais",
        type: "manual",
        status: "active",
        tools: "Google Docs, WordPress, Canva",
        responsible: "Redator e Designer",
        documentation: "Guia de estilo, checklist de publicação",
        areaId: marketing.id,
        parentId: conteudo.id,
      },
      {
        name: "Publicação e distribuição",
        description: "Agendamento e publicação nos canais definidos na estratégia",
        type: "systemic",
        status: "active",
        tools: "WordPress, Buffer, LinkedIn",
        responsible: "Analista de Marketing Digital",
        documentation: "Procedimento de publicação por canal",
        areaId: marketing.id,
        parentId: conteudo.id,
      },
    ],
  });

  // Processo: Gestão de Redes Sociais
  const redes = await prisma.process.create({
    data: {
      name: "Gestão de Redes Sociais",
      description: "Administração da presença da empresa nas plataformas sociais",
      type: "manual",
      status: "active",
      tools: "Buffer, Canva, Instagram, LinkedIn",
      responsible: "Analista de Marketing Digital",
      documentation: "Manual de identidade visual, frequência de postagem",
      areaId: marketing.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Criação de artes e copies",
        description: "Design gráfico e redação de textos para posts nas redes sociais",
        type: "manual",
        status: "active",
        tools: "Canva, Google Docs",
        responsible: "Designer e Redator",
        documentation: "Templates visuais, banco de copies aprovadas",
        areaId: marketing.id,
        parentId: redes.id,
      },
      {
        name: "Agendamento de publicações",
        description: "Programação de posts conforme calendário nos horários de maior engajamento",
        type: "systemic",
        status: "active",
        tools: "Buffer",
        responsible: "Analista de Marketing Digital",
        documentation: "Melhores horários por plataforma",
        areaId: marketing.id,
        parentId: redes.id,
      },
      {
        name: "Monitoramento e interação",
        description: "Acompanhamento de comentários, mensagens e métricas de engajamento",
        type: "manual",
        status: "active",
        tools: "Instagram, LinkedIn, Planilhas Google",
        responsible: "Analista de Marketing Digital",
        documentation: "Guia de respostas, relatório semanal de métricas",
        areaId: marketing.id,
        parentId: redes.id,
      },
    ],
  });

  // Processo: Campanhas de Performance
  const campanhas = await prisma.process.create({
    data: {
      name: "Campanhas de Performance",
      description: "Gestão de anúncios pagos para geração de leads e conversão",
      type: "systemic",
      status: "active",
      tools: "Google Ads, Meta Ads, Google Analytics",
      responsible: "Analista de Performance",
      documentation: "Playbook de mídia paga, relatórios de ROAS",
      areaId: marketing.id,
    },
  });

  await prisma.process.createMany({
    data: [
      {
        name: "Planejamento de campanhas",
        description: "Definição de objetivos, público-alvo, orçamento e criativos",
        type: "manual",
        status: "active",
        tools: "Google Docs, Notion",
        responsible: "Analista de Performance e Coordenador",
        documentation: "Brief de campanha, benchmarks do setor",
        areaId: marketing.id,
        parentId: campanhas.id,
      },
      {
        name: "Configuração e veiculação de anúncios",
        description: "Setup técnico das campanhas nas plataformas de ads",
        type: "systemic",
        status: "active",
        tools: "Google Ads, Meta Ads Manager",
        responsible: "Analista de Performance",
        documentation: "Guia de configuração por plataforma",
        areaId: marketing.id,
        parentId: campanhas.id,
      },
      {
        name: "Análise de resultados e otimização",
        description: "Acompanhamento de métricas e ajustes para melhorar o desempenho",
        type: "manual",
        status: "active",
        tools: "Google Analytics, Planilhas Google",
        responsible: "Analista de Performance",
        documentation: "Dashboard de KPIs, checklist de otimização",
        areaId: marketing.id,
        parentId: campanhas.id,
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
