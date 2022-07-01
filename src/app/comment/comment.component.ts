import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../full-post/full-post";
import {UiService} from "../ui.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()
  comment !: Comment
  fullScreen: boolean;

  constructor(public uiService: UiService) {
    this.fullScreen = false;

  }

  ngOnInit(): void {
  }

}
