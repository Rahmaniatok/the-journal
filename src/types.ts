// User entity
export type User = {
    id: string;
    username: string;
    role: string;
  };
  
  // Category entity
  export type Category = {
    id: string;
    name: string;
    userId: string;
    createdAt: string; // or Date if parsed
    updatedAt: string; // or Date if parsed
  };
  
  // Input for creating/updating categories
  export type CategoryInput = {
    name: string;
  };
  
  // Article entity
  export type Article = {
    id: string;
    title: string;
    content: string;
    userId: string;
    categoryId: string;
    imageUrl: string;
    createdAt: string; // or Date
    updatedAt: string; // or Date
    category: Category;
    user: User;
  };
  
  // Input for creating/updating articles
  export type ArticleInput = {
    title: string;
    content: string;
    categoryId: string;
  };
  