import {ReplyTo} from "./ReplyTo";

export class Reply {
  constructor(
    public id: number,
    public responeType: ReplyTo,
    public content: string,
    public image: File | null
  ) {
  }
}
