import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "./feed/post";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getFeed(page: number, size:number): Observable<Post[]> {
    return this.http.get<Post[]>("http://localhost:8080/api/post/feed?page=" + page + "&size=" + size);
  }
}
