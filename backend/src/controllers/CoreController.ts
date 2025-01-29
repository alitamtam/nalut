import { Request, Response } from "express";
import { userModel,  storyModel, newsModel, peopleModel } from "../models/CoreModel";

class CoreController {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  create = async (req: Request, res: Response) => {
    const newItem = await this.model.create(req.body);
    res.status(201).json(newItem);
  };

  getAll = async (req: Request, res: Response) => {
    const items = await this.model.getAll();
    res.json(items);
  };

  getOne = async (req: Request, res: Response) => {
    const item = await this.model.getOne(Number(req.params.id));
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  };

  update = async (req: Request, res: Response) => {
    const updatedItem = await this.model.update(Number(req.params.id), req.body);
    res.json(updatedItem);
  };

  delete = async (req: Request, res: Response) => {
    await this.model.delete(Number(req.params.id));
    res.status(204).send();
  };
}

export const storyController = new CoreController(storyModel);
export const newsController = new CoreController(newsModel);
export const peopleController = new CoreController(peopleModel);
