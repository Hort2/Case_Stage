import { prisma } from "../lib/prisma";
import { CreateProcessInput, UpdateProcessInput } from "../validators/process.validator";

export class ProcessRepository {
  async findAllByArea(areaId: string) {
    return prisma.process.findMany({
      where: { areaId },
      orderBy: { name: "asc" },
    });
  }

  async findById(id: string) {
    return prisma.process.findUnique({
      where: { id },
      include: { children: { orderBy: { name: "asc" } } },
    });
  }

  async create(data: CreateProcessInput) {
    return prisma.process.create({ data });
  }

  async update(id: string, data: UpdateProcessInput) {
    return prisma.process.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.process.delete({ where: { id } });
  }

  async search(query: string) {
    return prisma.process.findMany({
      where: { name: { contains: query } },
      include: { area: { select: { id: true, name: true } } },
      orderBy: { name: "asc" },
    });
  }
}
