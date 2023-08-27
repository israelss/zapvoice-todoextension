import { z } from "zod";

export const todoSchema = z.object({
  content: z.string().min(1, "A tarefa não pode ser vazia"),
});
