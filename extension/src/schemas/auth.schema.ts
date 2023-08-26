"use client";

import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  type: z.enum(["login", "register"]),
});
