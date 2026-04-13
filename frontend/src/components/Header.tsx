import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <span className="header-icon">◈</span>
          <h1>Process Mapper</h1>
        </Link>
        {!isHome && (
          <Link to="/" className="header-back">
            ← Voltar para áreas
          </Link>
        )}
      </div>
    </header>
  );
}
