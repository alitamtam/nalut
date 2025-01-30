import prisma from "../../config/db";


class CoreModel<T> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async create(data: T): Promise<T> {
    return this.model.create({ data });
  }

  async getAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async getOne(id: number): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}

export const userModel = new CoreModel(prisma.user);
export const roleModel = new CoreModel(prisma.role);
export const storyModel = new CoreModel(prisma.story);
export const newsModel = new CoreModel(prisma.news);
export const peopleModel = new CoreModel(prisma.people);