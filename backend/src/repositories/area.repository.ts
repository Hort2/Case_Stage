import { prisma } from "../lib/prisma";
import { CreateAreaInput, UpdateAreaInput } from "../validators/area.validator";

export class AreaRepository {
  async findAll() {
    return prisma.area.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { processes: true } } },
    });
  }

  async findById(id: string) {
    return prisma.area.findUnique({
      where: { id },
      include: { _count: { select: { processes: true } } },
    });
  }

  async findByName(name: string) {
    return prisma.area.findFirst({
      where: {
        name: name.trim(),
      },
    });
  }

  async create(data: CreateAreaInput) {
    return prisma.area.create({ data });
  }

  async update(id: string, data: UpdateAreaInput) {
    return prisma.area.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.area.delete({ where: { id } });
  }
}