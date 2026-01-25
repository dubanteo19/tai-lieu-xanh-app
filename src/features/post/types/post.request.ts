export interface CreatePostRequest {
  file: File;
  postRequest: {
    title: string;
    description?: string;
    majorId: number;
    tags: string[];
  };
}
