import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../full-post/full-post";
import {UiService} from "../ui.service";
import {ReplyTo} from "../reply/ReplyTo";

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

  constructor(public uiService: UiService) {
    this.fullScreen = false;

  }

  ngOnInit(): void {
  }

}
