import { emailSchema, passwordSchema } from "@/lib/vilidators/common.schema";
import z from "zod";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
