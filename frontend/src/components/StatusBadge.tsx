import type { ProcessStatus } from "../types";
import { PROCESS_STATUS_LABELS } from "../types";

interface StatusBadgeProps {
  status: ProcessStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = PROCESS_STATUS_LABELS[status];

  return (
    <span className={`badge badge-${status}`}>
      {label}
    </span>
  );
}
