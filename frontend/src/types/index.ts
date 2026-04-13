export const PROCESS_TYPES = ["manual", "systemic"] as const;
export type ProcessType = (typeof PROCESS_TYPES)[number];

export const PROCESS_STATUSES = ["active", "inactive"] as const;
export type ProcessStatus = (typeof PROCESS_STATUSES)[number];

export const PROCESS_TYPE_LABELS: Record<ProcessType, string> = {
  manual: "Manual",
  systemic: "Sistêmico",
};

export const PROCESS_STATUS_LABELS: Record<ProcessStatus, string> = {
  active: "Ativo",
  inactive: "Inativo",
};

export interface Area {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { processes: number };
}

export interface Process {
  id: string;
  name: string;
  description: string | null;
  type: ProcessType;
  status: ProcessStatus;
  tools: string | null;
  responsible: string | null;
  documentation: string | null;
  areaId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessTreeNode extends Process {
  children: ProcessTreeNode[];
}

export interface SearchResult extends Process {
  area: { id: string; name: string };
}
