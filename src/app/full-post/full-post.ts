import {Group, Image} from "../post/post";

export interface FullPost {
  id: number;
  postType: string;
  created: number;
  postAuthor: Author;
  content: string;
  title: string;
  group: Group;
  commentCount: number;
  image: null;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: Author;
  image: Image;
  created: number;
  contents: string;
  replies: Comment[];
}

export interface Author {
  pfp: Image | null;
  username: string;
  roles: Role[];
}

export interface Role {
  name: string;
}
