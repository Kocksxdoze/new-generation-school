import { z } from "zod";

export const listMediaQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
});

export const mediaIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateMediaSchema = z.object({
  alt: z.string().max(200),
});
