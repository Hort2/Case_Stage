import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { areaService } from "../services/api";
import type { Area } from "../types";

export function HomePage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    areaService
      .list()
      .then(setAreas)
      .catch((err) => console.error("Erro ao carregar áreas:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading">Carregando áreas...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Áreas da Empresa</h2>
          <p className="subtitle">
            Selecione uma área para visualizar seus processos
          </p>
        </div>
      </div>

      {areas.length === 0 ? (
        <p className="empty-state">Nenhuma área cadastrada.</p>
      ) : (
        <div className="area-grid">
          {areas.map((area) => (
            <Link to={`/areas/${area.id}`} key={area.id} className="area-card">
              <div className="area-card-header">
                <h3>{area.name}</h3>
                <span className="area-count">
                  {area._count?.processes ?? 0} processos
                </span>
              </div>
              {area.description && (
                <p className="area-description">{area.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
