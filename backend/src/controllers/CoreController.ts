import { Request, Response } from "express";
import { userModel, storyModel, newsModel, peopleModel } from "../models/CoreModel";

class CoreController {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const newItem = await this.model.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.model.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.model.getOne(Number(req.params.id));
      if (!item) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedItem = await this.model.update(Number(req.params.id), req.body);
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.model.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export const storyController = new CoreController(storyModel);
export const newsController = new CoreController(newsModel);
export const peopleController = new CoreController(peopleModel);
