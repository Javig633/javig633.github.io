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
      date: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      image: image().optional(), // ← nueva
    }),
});

export const collections = { writeups };