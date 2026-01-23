import { emailSchema } from "@/lib/vilidators/common.schema";
import z from "zod";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
