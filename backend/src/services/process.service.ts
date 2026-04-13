import { ProcessRepository } from "../repositories/process.repository";
import { AreaRepository } from "../repositories/area.repository";
import { CreateProcessInput, UpdateProcessInput } from "../validators/process.validator";
import { ProcessTreeNode } from "../types";

const repository = new ProcessRepository();
const areaRepository = new AreaRepository();

export class ProcessService {
  async getTree(areaId: string) {
    const area = await areaRepository.findById(areaId);
    if (!area) {
      throw { status: 404, message: "Área não encontrada" };
    }

    const processes = await repository.findAllByArea(areaId);
    return this.buildTree(processes);
  }

  async findById(id: string) {
    const process = await repository.findById(id);

    if (!process) {
      throw { status: 404, message: "Processo não encontrado" };
    }

    return process;
  }

  async create(data: CreateProcessInput) {
    const area = await areaRepository.findById(data.areaId);
    if (!area) {
      throw { status: 404, message: "Área não encontrada" };
    }

    if (data.parentId) {
      const parent = await repository.findById(data.parentId);
      if (!parent) {
        throw { status: 404, message: "Processo pai não encontrado" };
      }
      if (parent.areaId !== data.areaId) {
        throw { status: 400, message: "Processo pai pertence a outra área" };
      }
    }

    return repository.create(data);
  }

  async update(id: string, data: UpdateProcessInput) {
    await this.findById(id);

    if (data.parentId) {
      const parent = await repository.findById(data.parentId);
      if (!parent) {
        throw { status: 404, message: "Processo pai não encontrado" };
      }
      if (data.parentId === id) {
        throw { status: 400, message: "Processo não pode ser pai de si mesmo" };
      }
    }

    return repository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    return repository.delete(id);
  }

  async search(query: string) {
    if (!query || query.trim().length === 0) {
      return [];
    }
    return repository.search(query.trim());
  }

  /**
   * Monta a árvore hierárquica a partir de uma lista plana de processos.
   * Agrupa os filhos sob seus respectivos pais usando um Map indexado por ID.
   */
  private buildTree(processes: any[]): ProcessTreeNode[] {
    const map = new Map<string, ProcessTreeNode>();
    const roots: ProcessTreeNode[] = [];

    for (const p of processes) {
      map.set(p.id, { ...p, children: [] });
    }

    for (const node of map.values()) {
      if (node.parentId && map.has(node.parentId)) {
        map.get(node.parentId)!.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}
