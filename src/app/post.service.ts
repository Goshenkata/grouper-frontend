import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FullPost} from "./full-post/full-post";
import {SubmitForm} from "./submit-post/submit-form";
import {StringJsonResponse} from "./string-json-response";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }

  getById(postId: number): Observable<FullPost> {
    return this.http.get<FullPost>('http://localhost:8080/api/post/' + postId);
  }

  create(model: SubmitForm): Observable<StringJsonResponse> {
    let formData = new FormData();
    formData.append('content', model.content)
    formData.append('title', model.title)
    formData.append('groupName',model.groupName)
    if (model.image != null) {
      formData.append('image', model.image)
    }
    return this.http.post<StringJsonResponse>('http://localhost:8080/api/post/', formData)
  }

  delete(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/post/' + id)
  }
}
