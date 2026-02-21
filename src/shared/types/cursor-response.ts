export interface CursorReponse<T> {
  items: T[];
  nextCursor: string;
  hasNext: boolean;
}
