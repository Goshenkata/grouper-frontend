import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {GroupInfo} from "./group/group-info";
import {HttpClient} from "@angular/common/http";
import {FeedType} from "./feed/feed-type";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(public http: HttpClient) { }

  getInfo(group: string): Observable<GroupInfo> {
      return this.http.get<GroupInfo>('http://localhost:8080/api/group/' + group);
  }

  getFeedType(): FeedType {
    return FeedType.GROUP
  }
}
