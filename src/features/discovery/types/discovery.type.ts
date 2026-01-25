export const DocType = {
  PDF: "PDF",
  DOCX: "DOCX",
} as const;
export type DocType = (typeof DocType)[keyof typeof DocType];
export interface SearchFilters {
  majorId: string | null;
  keyword: string | null;
  fileType: DocType | null;
  tags: string[] | null;
  sortBy: string | null;
  direction: string | null;
  page: number | null;
}
