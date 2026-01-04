import z from "zod";

export const emailSchema = z.email("Email khong hop le");
export const passwordSchema = z.string().min(6, "Mat khau it nhat 6 ky tu");
