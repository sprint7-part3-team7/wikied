export interface Writer {
  name: string;
  id: number;
}

export interface Article {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  content: string;
  likeCount: number;
  isLiked: boolean | null;
}
