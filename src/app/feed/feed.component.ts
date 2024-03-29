import {Component, Input, OnInit} from '@angular/core';
import {FeedService} from "../feed.service";
import {Post} from "../post/post";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {SortType} from "./sort-type";
import {UiService} from "../ui.service";
import {FeedType} from "./feed-type";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input()
  feedType: FeedType = FeedType.NONE
  @Input()
  name: string = ''

  feed: Post[]
  page: number
  size: number

  constructor(public feedService: FeedService,
              private toastr: ToastrService,
              private router: Router,
              public uiService: UiService) {
    this.page = 0;
    this.size = 10;
    this.feed = [];
  }

  ngOnInit(): void {
    this.getFeed()
  }

  onScrollDown() {
    this.page++;
    this.getFeed()
  }

  navToPost(id: number) {
    this.router.navigate(['/post/' + id])
  }

  public setNew() {
    this.feedService.sort = SortType.NEW
    localStorage.setItem('sort', 'NEW')
    this.refreshFeed()
  }

  public setRising() {
    this.feedService.sort = SortType.RISING
    localStorage.setItem('sort', 'RISING')
    this.refreshFeed()
  }

  private getFeed() {
    return this.feedService.getFeed(this.page, this.size, this.feedService.sort, this.feedType , this.name)
      .subscribe({
        next: res => this.feed = this.feed.concat(res),
        error: () => this.toastr.error(),
      })
  }

  private refreshFeed() {
    this.page = 0
    return this.feedService.getFeed(this.page, this.size, this.feedService.sort, this.feedType, this.name)
      .subscribe({
        next: res => this.feed = res,
        error: () => this.toastr.error(),
      })
  }
}
