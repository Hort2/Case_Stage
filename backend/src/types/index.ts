export const PROCESS_TYPES = ["manual", "systemic"] as const;
export type ProcessType = (typeof PROCESS_TYPES)[number];

export const PROCESS_STATUSES = ["active", "inactive"] as const;
export type ProcessStatus = (typeof PROCESS_STATUSES)[number];

export interface AreaDTO {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessDTO {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcessTreeNode extends ProcessDTO {
  children: ProcessTreeNode[];
}
