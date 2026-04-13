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
    return repository.create(data);
  }

  async update(id: string, data: UpdateAreaInput) {
    await this.findById(id);
    return repository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);
    return repository.delete(id);
  }
}
