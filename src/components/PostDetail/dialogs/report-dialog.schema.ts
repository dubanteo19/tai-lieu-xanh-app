import { z } from "zod";
export const formSchema = z.object({
  reason: z.string({ error: "Vui long chon ly do" }),
});
export type ReportFormData = z.infer<typeof formSchema>;
