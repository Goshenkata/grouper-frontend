import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Reply} from "./reply/reply";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(public http: HttpClient) {
  }

  postComment(replyData: Reply): Observable<any> {
    let formData = new FormData();
    formData.append('id', replyData.id.toString());
    formData.append('content', replyData.content);
    formData.append('responseType', replyData.responeType);
    if (replyData.image != null) {
      formData.append('image', replyData.image)
    }
    console.log(replyData)
    return this.http.post('http://localhost:8080/api/comment/add', formData);
  }
}
