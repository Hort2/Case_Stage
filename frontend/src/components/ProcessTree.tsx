import type { ProcessTreeNode } from "../types";
import { ProcessNode } from "./ProcessNode";

interface ProcessTreeProps {
  nodes: ProcessTreeNode[];
  searchTerm?: string;
  onAddChild?: (parentId: string, parentName: string) => void;
  onEdit?: (node: ProcessTreeNode) => void;
  onDelete?: (node: ProcessTreeNode) => void;
}

export function ProcessTree({ nodes, searchTerm = "", onAddChild, onEdit, onDelete }: ProcessTreeProps) {
  return (
    <div className="tree">
      {nodes.map((node) => (
        <ProcessNode
          key={node.id}
          node={node}
          level={0}
          searchTerm={searchTerm}
          onAddChild={onAddChild}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
