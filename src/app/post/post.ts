export interface Post {
  id:           number;
  postType:     string;
  created:      number;
  image:        Image | null;
  postAuthor:   PostAuthor;
  content:      string;
  title:        string;
  groupName:    string;
  commentCount: number;
}

export interface Image {
  url:      string;
  publicId: string;
}

export interface PostAuthor {
  id:       number;
  pfp:      null;
  username: string;
  roles:    Role[];
}

export interface Role {
  name: string;
}
