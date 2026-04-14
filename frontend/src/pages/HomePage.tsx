import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { areaService } from "../services/api";
import { AreaForm } from "../components/AreaForm";
import type { Area } from "../types";

interface ModalState {
  open: boolean;
  editArea?: Area;
}

const MODAL_CLOSED: ModalState = { open: false };

export function HomePage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>(MODAL_CLOSED);

  const loadAreas = useCallback(() => {
    areaService
      .list()
      .then(setAreas)
      .catch((err) => console.error("Erro ao carregar áreas:", err));
  }, []);

  useEffect(() => {
    areaService
      .list()
      .then(setAreas)
      .catch((err) => console.error("Erro ao carregar áreas:", err))
      .finally(() => setLoading(false));
  }, []);

  function handleFormSuccess() {
    setModal(MODAL_CLOSED);
    loadAreas();
  }

  async function handleDelete(area: Area) {
    const count = area._count?.processes ?? 0;
    const message = count > 0
      ? `Excluir "${area.name}" e seus ${count} processo(s)?`
      : `Excluir "${area.name}"?`;

    if (!window.confirm(message)) return;

    try {
      await areaService.delete(area.id);
      loadAreas();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir área");
    }
  }

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
        <button className="btn btn-primary" onClick={() => setModal({ open: true })}>
          + Nova Área
        </button>
      </div>

      {areas.length === 0 ? (
        <p className="empty-state">Nenhuma área cadastrada.</p>
      ) : (
        <div className="area-grid">
          {areas.map((area) => (
            <div key={area.id} className="area-card">
              <Link to={`/areas/${area.id}`} className="area-card-link">
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
              <div className="area-card-actions">
                <button
                  className="area-action-btn"
                  title="Editar área"
                  onClick={() => setModal({ open: true, editArea: area })}
                >
                  ✎
                </button>
                <button
                  className="area-action-btn area-action-danger"
                  title="Excluir área"
                  onClick={() => handleDelete(area)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && (
        <AreaForm
          editArea={modal.editArea}
          onClose={() => setModal(MODAL_CLOSED)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
