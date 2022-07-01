import {Author} from "../full-post/full-post";

export interface Comment {
  id: number,
  author: Author,
  created: number,
  contents: string,
  replies: Comment[]
}
