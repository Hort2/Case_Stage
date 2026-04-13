import { useState } from "react";
import type { ProcessTreeNode } from "../types";
import { StatusBadge } from "./StatusBadge";
import { TypeIcon } from "./TypeIcon";

interface ProcessNodeProps {
  node: ProcessTreeNode;
  level: number;
}

export function ProcessNode({ node, level }: ProcessNodeProps) {
  const [expanded, setExpanded] = useState(level === 0);
  const hasChildren = node.children.length > 0;
  const hasDetails = node.description || node.tools || node.responsible || node.documentation;

  return (
    <div className="tree-node">
      <div
        className={`tree-node-header ${expanded ? "expanded" : ""}`}
        style={{ paddingLeft: `${level * 24}px` }}
        onClick={() => setExpanded(!expanded)}
      >
        <span className={`tree-chevron ${hasChildren ? "" : "invisible"}`}>
          {expanded ? "▾" : "▸"}
        </span>

        <span className="tree-node-name">{node.name}</span>

        <div className="tree-node-tags">
          <TypeIcon type={node.type} />
          <StatusBadge status={node.status} />
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
              <ProcessNode key={child.id} node={child} level={level + 1} />
            ))}
        </div>
      )}
    </div>
  );
}
