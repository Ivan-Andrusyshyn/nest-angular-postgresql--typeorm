export interface Comment {
  id: number;
  text: string;
  userId: number;
  postId: number;
  user: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  likes: { userId: number; username: string }[];
  comments: Comment[];
  user: User;
}
