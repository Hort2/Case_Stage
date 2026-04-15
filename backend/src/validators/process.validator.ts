import { z } from "zod";
import { PROCESS_TYPES, PROCESS_STATUSES } from "../types";

const NAME_MUST_HAVE_LETTER = /[A-Za-zÀ-ÖØ-öø-ÿ]/;

export const createProcessSchema = z.object({
  name: z
    .string({ error: "Nome é obrigatório" })
    .trim()
    .min(1, "Nome não pode ser vazio")
    .regex(NAME_MUST_HAVE_LETTER, "Nome deve conter ao menos uma letra")
    .max(150, "Nome deve ter no máximo 150 caracteres"),
  description: z
    .string()
    .max(1000, "Descrição deve ter no máximo 1000 caracteres")
    .nullable()
    .optional(),
  type: z.enum(PROCESS_TYPES).default("manual"),
  status: z.enum(PROCESS_STATUSES).default("active"),
  tools: z.string().max(500).nullable().optional(),
  responsible: z.string().max(300).nullable().optional(),
  documentation: z.string().max(1000).nullable().optional(),
  areaId: z.string().uuid("ID da área inválido"),
  parentId: z.string().uuid("ID do processo pai inválido").nullable().optional(),
});

export const updateProcessSchema = createProcessSchema
  .partial()
  .omit({ areaId: true });

export type CreateProcessInput = z.infer<typeof createProcessSchema>;
export type UpdateProcessInput = z.infer<typeof updateProcessSchema>;
