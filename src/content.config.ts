// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writeups = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/writeups" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      platform: z.string().optional(),
      difficulty: z.enum(["Easy", "Medium", "Hard", "Insane"]).optional(),
      os: z.enum(["Linux", "Windows"]).optional(),
      releaseDate: z.coerce.date().optional(), // fecha de salida de la máquina
      date: z.coerce.date().optional(),        // fecha en que la completaste
      userRank: z.union([z.number(), z.string()]).optional(), // tu rank
      tags: z.array(z.string()).optional(),
      image: image().optional(),
      imageShape: z.enum(["round", "square"]).optional().default("round"),
      rating: z.number().min(0).max(5).optional(),
    }),
});

export const collections = { writeups };