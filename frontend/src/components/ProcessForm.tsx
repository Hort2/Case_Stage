import { useState } from "react";
import { processService } from "../services/api";
import {
  PROCESS_TYPES,
  PROCESS_STATUSES,
  PROCESS_TYPE_LABELS,
  PROCESS_STATUS_LABELS,
} from "../types";
import type { ProcessType, ProcessStatus, ProcessTreeNode } from "../types";

interface ProcessFormProps {
  areaId: string;
  parentId: string | null;
  parentName?: string;
  editProcess?: ProcessTreeNode;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  description: string;
  type: ProcessType;
  status: ProcessStatus;
  tools: string;
  responsible: string;
  documentation: string;
}

function toFormData(p: ProcessTreeNode): FormData {
  return {
    name: p.name,
    description: p.description ?? "",
    type: p.type,
    status: p.status,
    tools: p.tools ?? "",
    responsible: p.responsible ?? "",
    documentation: p.documentation ?? "",
  };
}

const EMPTY_FORM: FormData = {
  name: "",
  description: "",
  type: "manual",
  status: "active",
  tools: "",
  responsible: "",
  documentation: "",
};

export function ProcessForm({ areaId, parentId, parentName, editProcess, onClose, onSuccess }: ProcessFormProps) {
  const isEditing = !!editProcess;
  const [form, setForm] = useState<FormData>(editProcess ? toFormData(editProcess) : EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function buildPayload() {
    return {
      name: form.name.trim(),
      description: form.description.trim() || null,
      type: form.type,
      status: form.status,
      tools: form.tools.trim() || null,
      responsible: form.responsible.trim() || null,
      documentation: form.documentation.trim() || null,
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (isEditing) {
        await processService.update(editProcess.id, buildPayload());
      } else {
        await processService.create({ ...buildPayload(), areaId, parentId });
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || `Erro ao ${isEditing ? "atualizar" : "criar"} processo`);
    } finally {
      setSaving(false);
    }
  }

  const title = isEditing
    ? "Editar Processo"
    : parentId
      ? "Novo Subprocesso"
      : "Novo Processo";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {parentName && !isEditing && (
          <p className="modal-context">
            Subprocesso de: <strong>{parentName}</strong>
          </p>
        )}

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
          <label className="form-field">
            <span className="form-label">Nome *</span>
            <input
              type="text"
              className="form-input"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Nome do processo"
              required
              autoFocus
            />
          </label>

          <label className="form-field">
            <span className="form-label">Descrição</span>
            <textarea
              className="form-input form-textarea"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Descrição breve do processo"
              rows={2}
            />
          </label>

          <div className="form-row">
            <label className="form-field">
              <span className="form-label">Tipo</span>
              <select
                className="form-input"
                value={form.type}
                onChange={(e) => updateField("type", e.target.value)}
              >
                {PROCESS_TYPES.map((t) => (
                  <option key={t} value={t}>{PROCESS_TYPE_LABELS[t]}</option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span className="form-label">Status</span>
              <select
                className="form-input"
                value={form.status}
                onChange={(e) => updateField("status", e.target.value)}
              >
                {PROCESS_STATUSES.map((s) => (
                  <option key={s} value={s}>{PROCESS_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="form-field">
            <span className="form-label">Ferramentas</span>
            <input
              type="text"
              className="form-input"
              value={form.tools}
              onChange={(e) => updateField("tools", e.target.value)}
              placeholder="Ex: Trello, Notion, Google Sheets"
            />
          </label>

          <label className="form-field">
            <span className="form-label">Responsável</span>
            <input
              type="text"
              className="form-input"
              value={form.responsible}
              onChange={(e) => updateField("responsible", e.target.value)}
              placeholder="Ex: Equipe de RH"
            />
          </label>

          <label className="form-field">
            <span className="form-label">Documentação</span>
            <input
              type="text"
              className="form-input"
              value={form.documentation}
              onChange={(e) => updateField("documentation", e.target.value)}
              placeholder="Ex: Manual de processos, checklists"
            />
          </label>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving || !form.name.trim()}>
              {saving ? "Salvando..." : isEditing ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
