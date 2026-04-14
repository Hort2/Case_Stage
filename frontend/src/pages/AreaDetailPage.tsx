import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { areaService, processService } from "../services/api";
import { ProcessTree } from "../components/ProcessTree";
import { ProcessForm } from "../components/ProcessForm";
import { SearchBar } from "../components/SearchBar";
import type { Area, ProcessTreeNode } from "../types";

interface ModalState {
  open: boolean;
  parentId: string | null;
  parentName?: string;
  editProcess?: ProcessTreeNode;
}

const MODAL_CLOSED: ModalState = { open: false, parentId: null };

export function AreaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [area, setArea] = useState<Area | null>(null);
  const [tree, setTree] = useState<ProcessTreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState<ModalState>(MODAL_CLOSED);

  const loadTree = useCallback(() => {
    if (!id) return;
    processService.getTree(id).then(setTree);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    Promise.all([areaService.getById(id), processService.getTree(id)])
      .then(([areaData, treeData]) => {
        setArea(areaData);
        setTree(treeData);
      })
      .catch((err) => console.error("Erro ao carregar área:", err))
      .finally(() => setLoading(false));
  }, [id]);

  function openCreateRoot() {
    setModal({ open: true, parentId: null });
  }

  function openCreateChild(parentId: string, parentName: string) {
    setModal({ open: true, parentId, parentName });
  }

  function openEdit(node: ProcessTreeNode) {
    setModal({ open: true, parentId: node.parentId, editProcess: node });
  }

  async function handleDelete(node: ProcessTreeNode) {
    const childCount = node.children.length;
    const message = childCount > 0
      ? `Excluir "${node.name}" e seus ${childCount} subprocesso(s)?`
      : `Excluir "${node.name}"?`;

    if (!window.confirm(message)) return;

    try {
      await processService.delete(node.id);
      loadTree();
    } catch (err: any) {
      alert(err.message || "Erro ao excluir processo");
    }
  }

  function handleFormSuccess() {
    setModal(MODAL_CLOSED);
    loadTree();
  }

  if (loading) {
    return <div className="loading">Carregando processos...</div>;
  }

  if (!area) {
    return <div className="empty-state">Área não encontrada.</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>{area.name}</h2>
          {area.description && (
            <p className="subtitle">{area.description}</p>
          )}
        </div>
        <button className="btn btn-primary" onClick={openCreateRoot}>
          + Novo Processo
        </button>
      </div>

      {tree.length === 0 ? (
        <p className="empty-state">Nenhum processo cadastrado nesta área.</p>
      ) : (
        <div className="tree-container">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <p className="tree-hint">
            {tree.length} processo(s) raiz · Clique nos processos para expandir
          </p>
          <ProcessTree
            nodes={tree}
            searchTerm={searchTerm}
            onAddChild={openCreateChild}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {modal.open && id && (
        <ProcessForm
          areaId={id}
          parentId={modal.parentId}
          parentName={modal.parentName}
          editProcess={modal.editProcess}
          onClose={() => setModal(MODAL_CLOSED)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
