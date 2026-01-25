import z from "zod";

export const createMdocSchema = z.object({
  title: z
    .string()
    .min(3, "Tieu de phai co it nhat 3 ky tu")
    .max(40, "Tieu de toi da 40 ky tu"),

  majorId: z.number().min(1, "Vui long chon 1 chuyen nganh"),

  description: z.string().max(200, "Mieu ta toi da 200 ky tu").optional(),

  tags: z.array(z.string()).min(1, "Chon it nhat 1 nhan "),

  file: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      "File phai nho hon 10MB",
    ),
});
export type CreateMDocValues = z.infer<typeof createMdocSchema>;
export const createMDocDefaultValues: CreateMDocValues = {
  title: "",
  description: "",
  majorId: 0,
  tags: [],
  file: undefined,
};
