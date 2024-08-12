export interface Writer {
  name: string;
  id: number;
  image?: string;
}

export interface Article {
  id: number;
  title: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  content: string;
  likeCount: number;
  isLiked: boolean;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}
