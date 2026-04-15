import { Request, Response } from "express";
import { AreaService } from "../services/area.service";

const service = new AreaService();

export class AreaController {
  async findAll(_req: Request, res: Response) {
    try {
      const areas = await service.findAll();
      res.json(areas);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const area = await service.findById(req.params.id as string);
      res.json(area);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const area = await service.create(req.body);
      res.status(201).json(area);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const area = await service.update(req.params.id as string, req.body);
      res.json(area);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await service.delete(req.params.id as string);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
}
