import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";
  const isAreaDetail = pathname.startsWith("/areas/");

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <span className="header-icon">◈</span>
          <h1>Process Mapper</h1>
        </Link>
        {isLanding ? (
          <Link to="/areas" className="header-nav-link">
            Acessar sistema →
          </Link>
        ) : isAreaDetail ? (
          <Link to="/areas" className="header-back">
            ← Voltar para áreas
          </Link>
        ) : (
          <Link to="/" className="header-back">
            ← Início
          </Link>
        )}
      </div>
    </header>
  );
}
