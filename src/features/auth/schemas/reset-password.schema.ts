import { passwordSchema } from "@/lib/vilidators/common.schema";
import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mat khau xac nhan khong khop",
    path: ["confirmPassword"],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
export const resetPasswordDefaultValues: ResetPasswordValues = {
  password: "",
  confirmPassword: "",
};
