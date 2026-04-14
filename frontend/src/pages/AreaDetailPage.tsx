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
}

export function AreaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [area, setArea] = useState<Area | null>(null);
  const [tree, setTree] = useState<ProcessTreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState<ModalState>({ open: false, parentId: null });

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

  function handleFormSuccess() {
    setModal({ open: false, parentId: null });
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
          />
        </div>
      )}

      {modal.open && id && (
        <ProcessForm
          areaId={id}
          parentId={modal.parentId}
          parentName={modal.parentName}
          onClose={() => setModal({ open: false, parentId: null })}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
