import {Component, Input, OnInit} from '@angular/core';
import {Post} from "./post";
import {UiService} from "../ui.service";
import {FeedType} from "../feed/feed-type";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  post!: Post;
  @Input()
  feedType: FeedType = FeedType.NONE
  uiService: UiService
  fullScreen: boolean;

  constructor(uiService: UiService) {
    this.uiService = uiService;
    this.fullScreen = false;
  }

  ngOnInit(): void {
  }

  isGroup(): boolean {
    return this.feedType == FeedType.GROUP
  }

  isUser(): boolean {
    return this.feedType == FeedType.USER
  }

}
