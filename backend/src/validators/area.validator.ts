import { z } from "zod";

const NAME_MUST_HAVE_LETTER = /[A-Za-zÀ-ÖØ-öø-ÿ]/;

export const createAreaSchema = z.object({
  name: z
    .string({ error: "Nome é obrigatório" })
    .trim()
    .min(1, "Nome não pode ser vazio")
    .regex(NAME_MUST_HAVE_LETTER, "Nome deve conter ao menos uma letra")
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
