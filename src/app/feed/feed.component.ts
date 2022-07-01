import {Component, OnInit} from '@angular/core';
import {FeedService} from "../feed.service";
import {Post} from "../post/post";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  feed: Post[]
  page: number
  size: number

  constructor(private feedService: FeedService,
              private toastr: ToastrService,
              private router: Router) {
    this.page = 0;
    this.size = 10;
    this.feed = [];
    this.feedService.getFeed(this.page, this.size)
      .subscribe({
        next: res => this.feed = res,
        error: () => toastr.error("Something went wrong :(")
      })
  }

  ngOnInit(): void {
  }

  onScrollDown() {
    this.page++;
    this.feedService.getFeed(this.page, this.size)
      .subscribe({
        next: res => this.feed = this.feed.concat(res),
        error: () => this.toastr.error("Something went wrong :("),
      })
  }

  navToPost(id: number) {
    this.router.navigate(['/post/' + id])
  }
}
