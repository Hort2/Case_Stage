import { Request, Response } from "express";
import { ProcessService } from "../services/process.service";

const service = new ProcessService();

export class ProcessController {
  async getTree(req: Request, res: Response) {
    try {
      const tree = await service.getTree(req.params.areaId as string);
      res.json(tree);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const process = await service.findById(req.params.id as string);
      res.json(process);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const process = await service.create(req.body);
      res.status(201).json(process);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const process = await service.update(req.params.id as string, req.body);
      res.json(process);
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

  async search(req: Request, res: Response) {
    try {
      const query = req.query.q as string || "";
      const results = await service.search(query);
      res.json(results);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
}
