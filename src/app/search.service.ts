import {Injectable} from '@angular/core';
import {SearchType} from "./search/SearchType";
import {Observable} from "rxjs";
import {SearchDto} from "./search/search.dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchType: SearchType

  constructor(public http: HttpClient) {
    let searchType: string = localStorage.getItem('searchType') ?? 'USER'
    if (searchType == 'USER') {
      this.searchType = SearchType.USER
    } else {
      this.searchType = SearchType.GROUP
    }
  }

  getQueryResult(query: string, searchType: SearchType): Observable<SearchDto[]> {
    return this.http.get<SearchDto[]>('http://localhost:8080/api/get-object?query=' + query + '&objectType=' + searchType.toString())
  }
}
