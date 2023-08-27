"use client";

import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  type: z.enum(["login", "register"]),
});
