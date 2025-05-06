export type User = {
    id: string;
    username: string;
    role: string;
  };
  
  export type Category = {
    id: string;
    name: string;
    userId: string;
    createdAt: string; 
    updatedAt: string; 
  };
  
  export type CategoryInput = {
    name: string;
  };
  
  export type Article = {
    id: string;
    title: string;
    content: string;
    userId: string;
    categoryId: string;
    imageUrl: string;
    createdAt: string; 
    updatedAt: string; 
    category: Category;
    user: User;
  };
  
  export type ArticleInput = {
    title: string;
    content: string;
    categoryId: string;
  };
  