const API_BASE = "http://localhost:3333/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `Erro ${res.status}`);
  }

  if (res.status === 204) return null as T;
  return res.json();
}

// ─── Áreas ─────────────────────────────────────────────────────────

import type { Area, ProcessTreeNode, Process, SearchResult } from "../types";

export const areaService = {
  list: () => request<Area[]>("/areas"),
  getById: (id: string) => request<Area>(`/areas/${id}`),
  create: (data: { name: string; description?: string | null }) =>
    request<Area>("/areas", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: { name?: string; description?: string | null }) =>
    request<Area>(`/areas/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/areas/${id}`, { method: "DELETE" }),
};

// ─── Processos ─────────────────────────────────────────────────────

export const processService = {
  getTree: (areaId: string) =>
    request<ProcessTreeNode[]>(`/processes/tree/${areaId}`),
  getById: (id: string) => request<Process>(`/processes/${id}`),
  search: (query: string) =>
    request<SearchResult[]>(`/processes/search?q=${encodeURIComponent(query)}`),
  create: (data: Partial<Process> & { name: string; areaId: string }) =>
    request<Process>("/processes", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Process>) =>
    request<Process>(`/processes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/processes/${id}`, { method: "DELETE" }),
};
