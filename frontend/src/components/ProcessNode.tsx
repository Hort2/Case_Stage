import { useState, useEffect } from "react";
import type { ProcessTreeNode } from "../types";
import { StatusBadge } from "./StatusBadge";
import { TypeIcon } from "./TypeIcon";

interface ProcessNodeProps {
  node: ProcessTreeNode;
  level: number;
  searchTerm?: string;
  onAddChild?: (parentId: string, parentName: string) => void;
  onEdit?: (node: ProcessTreeNode) => void;
  onDelete?: (node: ProcessTreeNode) => void;
}

function hasMatchInSubtree(node: ProcessTreeNode, term: string): boolean {
  const lower = term.toLowerCase();
  if (node.name.toLowerCase().includes(lower)) return true;
  return node.children.some((child) => hasMatchInSubtree(child, lower));
}

function HighlightedName({ name, term }: { name: string; term: string }) {
  if (!term) return <>{name}</>;

  const index = name.toLowerCase().indexOf(term.toLowerCase());
  if (index === -1) return <>{name}</>;

  return (
    <>
      {name.slice(0, index)}
      <mark className="search-highlight">{name.slice(index, index + term.length)}</mark>
      {name.slice(index + term.length)}
    </>
  );
}

export function ProcessNode({ node, level, searchTerm = "", onAddChild, onEdit, onDelete }: ProcessNodeProps) {
  const isSearching = searchTerm.length > 0;
  const nameMatches = isSearching && node.name.toLowerCase().includes(searchTerm.toLowerCase());
  const subtreeMatches = isSearching && hasMatchInSubtree(node, searchTerm);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isSearching && subtreeMatches) {
      setExpanded(true);
    }
  }, [isSearching, subtreeMatches]);

  const hasChildren = node.children.length > 0;
  const hasDetails = node.description || node.tools || node.responsible || node.documentation;

  return (
    <div className={`tree-node ${isSearching && !subtreeMatches ? "tree-node-dimmed" : ""}`}>
      <div
        className={`tree-node-header ${expanded ? "expanded" : ""} ${nameMatches ? "search-match" : ""}`}
        style={{ paddingLeft: `${level * 24}px` }}
        onClick={() => setExpanded(!expanded)}
      >
        <span className={`tree-chevron ${hasChildren ? "" : "invisible"}`}>
          {expanded ? "▾" : "▸"}
        </span>

        <span className="tree-node-name">
          <HighlightedName name={node.name} term={searchTerm} />
        </span>

        <div className="tree-node-tags">
          <TypeIcon type={node.type} />
          <StatusBadge status={node.status} />
          <div className="tree-node-actions">
            {onEdit && (
              <button
                className="tree-action-btn"
                title="Editar processo"
                onClick={(e) => { e.stopPropagation(); onEdit(node); }}
              >
                ✎
              </button>
            )}
            {onAddChild && (
              <button
                className="tree-action-btn"
                title="Adicionar subprocesso"
                onClick={(e) => { e.stopPropagation(); onAddChild(node.id, node.name); }}
              >
                +
              </button>
            )}
            {onDelete && (
              <button
                className="tree-action-btn tree-action-danger"
                title="Excluir processo"
                onClick={(e) => { e.stopPropagation(); onDelete(node); }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="tree-node-body" style={{ paddingLeft: `${level * 24 + 28}px` }}>
          {hasDetails && (
            <div className="tree-node-details">
              {node.description && (
                <p className="detail-row">
                  <span className="detail-label">Descrição</span>
                  {node.description}
                </p>
              )}
              {node.tools && (
                <p className="detail-row">
                  <span className="detail-label">Ferramentas</span>
                  {node.tools}
                </p>
              )}
              {node.responsible && (
                <p className="detail-row">
                  <span className="detail-label">Responsável</span>
                  {node.responsible}
                </p>
              )}
              {node.documentation && (
                <p className="detail-row">
                  <span className="detail-label">Documentação</span>
                  {node.documentation}
                </p>
              )}
            </div>
          )}

          {hasChildren &&
            node.children.map((child) => (
              <ProcessNode
                key={child.id}
                node={child}
                level={level + 1}
                searchTerm={searchTerm}
                onAddChild={onAddChild}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
}
