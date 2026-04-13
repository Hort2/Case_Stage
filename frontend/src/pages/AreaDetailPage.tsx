import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { areaService, processService } from "../services/api";
import type { Area, ProcessTreeNode } from "../types";

export function AreaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [area, setArea] = useState<Area | null>(null);
  const [tree, setTree] = useState<ProcessTreeNode[]>([]);
  const [loading, setLoading] = useState(true);

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
      </div>

      {tree.length === 0 ? (
        <p className="empty-state">Nenhum processo cadastrado nesta área.</p>
      ) : (
        <div className="tree-container">
          <p className="tree-hint">
            {tree.length} processo(s) raiz · Clique para expandir
          </p>
          {/* A árvore expansível será implementada na próxima etapa */}
          <pre className="tree-preview">
            {JSON.stringify(tree.map((n) => ({
              name: n.name,
              type: n.type,
              children: n.children.length,
            })), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
