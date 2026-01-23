import { emailSchema, passwordSchema } from "@/lib/vilidators/common.schema";
import z from "zod";

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    fullName: z.string().min(4, "Ten phai co it nhat 4 ky tu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mat khau xac nhan khong khop",
    path: ["confirmPassword"],
  });
