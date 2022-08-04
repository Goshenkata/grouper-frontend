import {Component, OnInit, ViewChild} from '@angular/core';
import {SubmitForm} from "./submit-form";
import {SearchType} from "../search/SearchType";
import {SearchComponent} from "../search/search.component";
import {ReplyComponent} from "../reply/reply.component";
import {SearchService} from "../search.service";
import {PostService} from "../post.service";
import {Router} from "@angular/router";
import {UiService} from "../ui.service";
import {UserService} from "../user.service";
import {SubmitService} from "../submit.service";
import {LoadingService} from "../loading.service";

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
              public submitService: SubmitService,
              private userService: UserService,
              private router: Router,
              public uiService: UiService,
              public loadingService: LoadingService) {
    if (userService.isLoggedOut()) {
      router.navigateByUrl('login')
    }
    this.model = submitService.model;
    this.search = submitService.search
    this.reply = submitService.reply
  }

  ngOnInit(): void {
  }

  createPost(): void {
    this.loadingService.isLoading = true
    this.model.groupName = this.search!.query;
    this.model.content = this.reply!.replyData.content;
    this.model.image = this.reply!.replyData.image;
    this.postService.create(this.model)
      .subscribe({
        next: value => this.router.navigateByUrl(value.response),
        error: err => {
          this.submitService.model = this.model;
          this.submitService.reply = this.reply
          this.submitService.search = this.search
          this.errorMessage = err.error.response
        },
        complete: () => this.loadingService.isLoading = false
      })
    this.loadingService.isLoading = false
  }
}
