import { Injectable } from '@angular/core';
import {SearchType} from "./search/SearchType";
import {Observable} from "rxjs";
import {SearchDto} from "./search/search.dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(public http: HttpClient) { }

  getQueryResult(query: string, searchType: SearchType): Observable<SearchDto[]> {
    return this.http.get<SearchDto[]>('http://localhost:8080/get-object?query=' + query + '&objectType=' + searchType.toString())
  }
}
