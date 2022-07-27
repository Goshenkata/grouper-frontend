import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "./post/post";
import {Observable} from "rxjs";
import {SortType} from "./feed/sort-type";
import {FeedType} from "./feed/feed-type";

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  public sort: SortType;

  constructor(private http: HttpClient) {
    let sortString: string = localStorage.getItem('sort') ?? 'RISING'
    switch (sortString) {
      case 'RISING':
        this.sort = SortType.RISING
        break
      case 'NEW':
        this.sort = SortType.NEW
        break
      default:
        this.sort = SortType.RISING
    }
  }

  getFeed(page: number, size: number, sort: SortType, feedType: FeedType, name: string): Observable<Post[]> {
    return this.http.get<Post[]>("http://localhost:8080/api/feed?page=" + page + "&size=" + size + "&sort=" + sort.toString() + '&feedType=' + feedType.toString() + '&name=' + name);
  }


  public isRising(): boolean {
    return this.sort == SortType.RISING
  }

  public isNew(): boolean {
    return this.sort == SortType.NEW
  }


}
