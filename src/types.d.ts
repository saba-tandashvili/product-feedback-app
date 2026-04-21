type User = {
  image: string;
  name: string;
  username: string;
};

type Reply = {
  id: Key | null | undefined;
  content: string;
  replyingTo: string;
  user: User;
};

type Comment = {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
};

export type Product = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
  comments?: Comment[];
};