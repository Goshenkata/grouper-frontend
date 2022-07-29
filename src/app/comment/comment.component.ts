import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../full-post/full-post";
import {UiService} from "../ui.service";
import {ReplyTo} from "../reply/ReplyTo";
import {UserService} from "../user.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()
  comment !: Comment
  fullScreen: boolean;
  replyExpand: boolean = false;
  public ReplyTo = ReplyTo;
  hovered: boolean = false;

  constructor(public uiService: UiService,
              public userService: UserService) {
    this.fullScreen = false;

  }

  getRrc(): string {
  if (this.comment.author.pfp == null) {
    return 'assets/images/default-pfp.jpg'
  }
    return this.comment.author.pfp.url
  }

  ngOnInit(): void {
  }

}
