import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FullPost} from "./full-post/full-post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getById(postId: number): Observable<FullPost> {
    return this.http.get<FullPost>('http://localhost:8080/api/post/' + postId);
  }
}
