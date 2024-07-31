export interface Writer {
  name: string;
  id: number;
}

export interface Board {
  id: number;
  title: string;
  image: string;
  writer: Writer;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}
