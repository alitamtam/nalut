import { Request, Response } from "express";
import prisma from "../../config/db";
import { z } from "zod"; // For input validation


// Define search query schema for validation
const searchSchema = z.object({
  term: z.string().min(1, "Search term is required"),
  limit: z.string().optional(),
  page: z.string().optional(),
});

/**
 * Global Search Controller - Searches multiple entities.
 */
export const searchDatabase = async (req: Request, res: Response) => {
  try {
    // Validate query parameters
    const { term, limit = "10", page = "1" } = searchSchema.parse(req.query);

    // Convert limit & page to numbers
    const pageSize = parseInt(limit, 10);
    const currentPage = parseInt(page, 10);
    const skip = (currentPage - 1) * pageSize;

    // Entities to search
    const entitySearches = [
      {
        key: "news",
        query: prisma.news.findMany({
          where: { OR: [{ title: { contains: term, mode: "insensitive" } }] },
          take: pageSize,
          skip,
        }),
      },
      {
        key: "stories",
        query: prisma.story.findMany({
          where: { OR: [{ title: { contains: term, mode: "insensitive" } }] },
          take: pageSize,
          skip,
        }),
      },
      {
        key: "people",
        query: prisma.user.findMany({
          where: {
            OR: [
            
              { username: { contains: term, mode: "insensitive" } },
            ],
          },
          take: pageSize,
          skip,
        }),
      },
      {
        key: "organizations",
        query: prisma.organization.findMany({
          where: { name: { contains: term, mode: "insensitive" } },
          take: pageSize,
          skip,
        }),
      },
      {
        key: "vehicles",
        query: prisma.vehicle.findMany({
          where: { licensePlate: { contains: term, mode: "insensitive" } },
          take: pageSize,
          skip,
        }),
      },
      {
        key: "incidents",
        query: prisma.incident.findMany({
          where: {
            OR: [
              { description: { contains: term, mode: "insensitive" } },
              { location: { contains: term, mode: "insensitive" } },
            ],
          },
          take: pageSize,
          skip,
        }),
      },
    ];

    // Execute all queries in parallel
    const results = await Promise.all(entitySearches.map((search) => search.query));

    // Structure response
    const response = entitySearches.reduce((acc, search, index) => {
      acc[search.key] = results[index];
      return acc;
    }, {} as Record<string, any[]>);

    res.json({
      searchTerm: term,
      currentPage,
      pageSize,
      results: response,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(400).json({ error: (error as Error).message });
  }
};
