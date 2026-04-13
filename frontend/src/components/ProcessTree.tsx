import type { ProcessTreeNode } from "../types";
import { ProcessNode } from "./ProcessNode";

interface ProcessTreeProps {
  nodes: ProcessTreeNode[];
  searchTerm?: string;
}

export function ProcessTree({ nodes, searchTerm = "" }: ProcessTreeProps) {
  return (
    <div className="tree">
      {nodes.map((node) => (
        <ProcessNode key={node.id} node={node} level={0} searchTerm={searchTerm} />
      ))}
    </div>
  );
}
