import {Author} from "../full-post/full-post";

export interface Post {
  id: number;
  postType: string;
  created: number;
  image: Image | null;
  postAuthor: Author;
  content: string;
  title: string;
  group: Group;
  commentCount: number;
}

export interface Image {
  url: string;
  publicId: string;
}

export interface Group {
  name: string;
  iconUrl: string;
}
