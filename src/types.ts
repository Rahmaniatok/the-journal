export interface Article {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
    category: {
      id: string;
      name: string;
    };
    user?: {
      username: string;
    };
  }