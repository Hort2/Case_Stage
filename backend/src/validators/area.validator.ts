import { z } from "zod";

export const createAreaSchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .min(1, "Nome não pode ser vazio")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .nullable()
    .optional(),
});

export const updateAreaSchema = createAreaSchema.partial();

export type CreateAreaInput = z.infer<typeof createAreaSchema>;
export type UpdateAreaInput = z.infer<typeof updateAreaSchema>;
