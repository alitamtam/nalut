export interface Story {
    id: number;
    title: string;
    content: string;
    image?: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
  }