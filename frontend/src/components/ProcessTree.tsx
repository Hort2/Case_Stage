import type { ProcessTreeNode } from "../types";
import { ProcessNode } from "./ProcessNode";

interface ProcessTreeProps {
  nodes: ProcessTreeNode[];
}

export function ProcessTree({ nodes }: ProcessTreeProps) {
  return (
    <div className="tree">
      {nodes.map((node) => (
        <ProcessNode key={node.id} node={node} level={0} />
      ))}
    </div>
  );
}
