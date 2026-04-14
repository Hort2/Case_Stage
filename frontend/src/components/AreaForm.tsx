import { useState } from "react";
import { areaService } from "../services/api";
import type { Area } from "../types";

interface AreaFormProps {
  editArea?: Area;
  onClose: () => void;
  onSuccess: () => void;
}

export function AreaForm({ editArea, onClose, onSuccess }: AreaFormProps) {
  const isEditing = !!editArea;
  const [name, setName] = useState(editArea?.name ?? "");
  const [description, setDescription] = useState(editArea?.description ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      name: name.trim(),
      description: description.trim() || null,
    };

    try {
      if (isEditing) {
        await areaService.update(editArea.id, payload);
      } else {
        await areaService.create(payload);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || `Erro ao ${isEditing ? "atualizar" : "criar"} área`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditing ? "Editar Área" : "Nova Área"}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
          <label className="form-field">
            <span className="form-label">Nome *</span>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Recursos Humanos"
              required
              autoFocus
            />
          </label>

          <label className="form-field">
            <span className="form-label">Descrição</span>
            <textarea
              className="form-input form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição breve da área"
              rows={3}
            />
          </label>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving || !name.trim()}>
              {saving ? "Salvando..." : isEditing ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
