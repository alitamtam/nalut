// src/types/profile.ts
export interface Profile {
    id: number;
    name: string;
    description?: string;
    image?: string;
    userId?: number;
    createdAt: Date;
    updatedAt: Date;
  }