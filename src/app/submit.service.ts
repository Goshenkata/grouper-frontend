import {Injectable} from '@angular/core';
import {SearchComponent} from "./search/search.component";
import {ReplyComponent} from "./reply/reply.component";
import {SubmitForm} from "./submit-post/submit-form";

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  public search: SearchComponent | undefined;
  public reply: ReplyComponent | undefined;
  public model = new SubmitForm('', null, '', '')

  constructor() {
  }
}
