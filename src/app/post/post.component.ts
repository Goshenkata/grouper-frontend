import { Component, Input, OnInit } from '@angular/core';
import { Post } from './post';
import { UiService } from '../ui.service';
import { FeedType } from '../feed/feed-type';
import { UserService } from '../user.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input()
  post!: Post;
  @Input()
  feedType: FeedType = FeedType.NONE;
  uiService: UiService;
  fullScreen: boolean;

  constructor(
    uiService: UiService,
    public router: Router,
    public userService: UserService,
    public postService: PostService,
    public toastr: ToastrService,
    public loadingService: LoadingService
  ) {
    this.uiService = uiService;
    this.fullScreen = false;
  }

  ngOnInit(): void {}

  isGroup(): boolean {
    return this.feedType == FeedType.GROUP;
  }

  isUser(): boolean {
    return this.feedType == FeedType.USER;
  }

  delete(id: number) {
    this.loadingService.isLoading = true;
    this.postService.delete(id).subscribe({
      next: () => {
        this.toastr.success('Post deleted successfully');
        this.router.navigateByUrl('/');
      },
      error: () => this.toastr.error(),
      complete: () => (this.loadingService.isLoading = false),
    });
  }
}
