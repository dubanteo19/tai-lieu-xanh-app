import z from "zod";

export const emailSchema = z.email("Email không hợp lệ");
export const passwordSchema = z.string().min(6, "Mật khẩu ít nhất 6 ký tự");
