import {Component, Input, OnInit} from '@angular/core';
import {Post} from "./post";
import {UiService} from "../ui.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  post!: Post;
  uiService: UiService
  fullScreen: boolean;

  constructor(uiService: UiService) {
    this.uiService = uiService;
    this.fullScreen = false;
  }

  ngOnInit(): void {
  }


}
