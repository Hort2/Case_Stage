import type { ProcessType } from "../types";
import { PROCESS_TYPE_LABELS } from "../types";

interface TypeIconProps {
  type: ProcessType;
}

export function TypeIcon({ type }: TypeIconProps) {
  const label = PROCESS_TYPE_LABELS[type];
  const isSystemic = type === "systemic";

  return (
    <span className={`type-icon type-${type}`} title={label}>
      {isSystemic ? "⚙" : "✋"} {label}
    </span>
  );
}
