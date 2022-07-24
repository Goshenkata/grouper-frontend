import {Component, OnInit, ViewChild} from '@angular/core';
import {SubmitForm} from "./submit-form";
import {SearchType} from "../search/SearchType";
import {SearchComponent} from "../search/search.component";
import {ReplyComponent} from "../reply/reply.component";
import {SearchService} from "../search.service";
import {PostService} from "../post.service";
import {Router} from "@angular/router";
import {UiService} from "../ui.service";

@Component({
  selector: 'app-submit-post',
  templateUrl: './submit-post.component.html',
  styleUrls: ['./submit-post.component.css']
})
export class SubmitPostComponent implements OnInit {

  model: SubmitForm = new SubmitForm('', null, '', '')
  searchType: SearchType = SearchType.GROUP
  errorMessage: string | null = null;
  @ViewChild(SearchComponent) search: SearchComponent | undefined;
  @ViewChild(ReplyComponent) reply: ReplyComponent | undefined;

  constructor(public postService: PostService,
              private router: Router,
              public uiService: UiService) {
  }

  ngOnInit(): void {
  }

  createPost(): void {
    //todo validation
    this.model.groupName = this.search!.query;
    this.model.content = this.reply!.replyData.content;
    this.model.image = this.reply!.replyData.image;
    this.postService.create(this.model)
      .subscribe({
        next: value => this.router.navigateByUrl(value.response),
        error: err => this.errorMessage = err.error.response
      })
  }
}
