export interface Comment {
  id: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
}

export interface Feedback {
  id: number;
  title: string;
  category?: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comment[];
}
