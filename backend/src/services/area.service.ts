import { AreaRepository } from "../repositories/area.repository";
import { CreateAreaInput, UpdateAreaInput } from "../validators/area.validator";

const repository = new AreaRepository();

export class AreaService {
  async findAll() {
    return repository.findAll();
  }

  async findById(id: string) {
    const area = await repository.findById(id);

    if (!area) {
      throw { status: 404, message: "Área não encontrada" };
    }

    return area;
  }

  async create(data: CreateAreaInput) {
    const existingArea = await repository.findByName(data.name);
  
    if (existingArea) {
      throw { status: 400, message: "Já existe uma área com esse nome" };
    }
  
    return repository.create(data);
  }

  async update(id: string, data: UpdateAreaInput) {
    await this.findById(id);
  
    if (data.name) {
      const existingArea = await repository.findByName(data.name);
  
      if (existingArea && existingArea.id !== id) {
        throw { status: 400, message: "Já existe uma área com esse nome" };
      }
    }
  
    return repository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    return repository.delete(id);
  }
}
