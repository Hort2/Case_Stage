import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: "🗂️",
    title: "Áreas organizadas",
    description: "Agrupe processos por departamento ou setor da empresa.",
  },
  {
    icon: "🌳",
    title: "Árvore hierárquica",
    description: "Visualize processos e subprocessos em estrutura expansível.",
  },
  {
    icon: "🔍",
    title: "Busca inteligente",
    description: "Encontre qualquer processo por nome com destaque instantâneo.",
  },
  {
    icon: "⚙️",
    title: "CRUD completo",
    description: "Crie, edite e exclua áreas e processos pela interface.",
  },
];

const STEPS = [
  { number: "1", text: "Crie as áreas da empresa" },
  { number: "2", text: "Cadastre processos e subprocessos" },
  { number: "3", text: "Navegue e gerencie pela árvore" },
];

export function LandingPage() {
  return (
    <div className="landing">
      <section className="hero">
        <span className="hero-icon">◈</span>
        <h1 className="hero-title">Process Mapper</h1>
        <p className="hero-subtitle">
          Mapeamento e visualização de processos organizacionais
          em estrutura hierárquica interativa.
        </p>
        <Link to="/areas" className="btn btn-primary hero-cta">
          Ver áreas →
        </Link>
      </section>

      <section className="landing-section">
        <h2 className="section-title">Sobre a solução</h2>
        <p className="section-text">
          O Process Mapper é uma aplicação web para cadastro e visualização de
          processos empresariais. Cada área da empresa possui sua árvore de
          processos, permitindo navegar de forma intuitiva entre processos
          manuais e sistêmicos, seus responsáveis, ferramentas e documentação.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="section-title">Funcionalidades</h2>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-name">{f.title}</h3>
              <p className="feature-description">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <h2 className="section-title">Como funciona</h2>
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.number} className="step">
              <span className="step-number">{s.number}</span>
              <p className="step-text">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section landing-footer">
        <p className="section-text">
          Desenvolvido com React, Node.js, TypeScript, Prisma e SQLite.
        </p>
      </section>
    </div>
  );
}
