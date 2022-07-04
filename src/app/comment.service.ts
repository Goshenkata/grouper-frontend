import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Reply} from "./reply/reply";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(public http: HttpClient) { }

  postComment(replyData: Reply): Observable<void> {
    let formData = new FormData();
    formData.append('id', replyData.id.toString());
    formData.append('content', replyData.content);
    formData.append('responseType', replyData.responeType.toString());
    if (replyData.image != null) {
      formData.append('image', replyData.image)
    }
    let httpMultipart = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; charset=UTF-8'
      })
    };
   return this.http.post<void>('http://localhost:8080/api/comment/add', formData, httpMultipart);
  }
}
