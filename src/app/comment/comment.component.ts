import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../full-post/full-post";
import {UiService} from "../ui.service";
import {ReplyTo} from "../reply/ReplyTo";
import {UserService} from "../user.service";
import {CommentService} from "../comment.service";
import {ToastrService} from "ngx-toastr";
import {LoadingService} from "../loading.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()
  comment !: Comment
  @Input()
  isTopLevel: boolean = false;
  fullScreen: boolean;
  replyExpand: boolean = false;
  public ReplyTo = ReplyTo;
  hovered: boolean = false;

  constructor(public uiService: UiService,
              public userService: UserService,
              public commentService: CommentService,
              public toastr: ToastrService,
              public loadingService: LoadingService) {
    this.fullScreen = false;

  }

  getSrc(): string {
    if (this.comment.author == null) {
      return 'assets/images/default-pfp.jpg'
    }
    if (this.comment.author.pfp == null) {
      return 'assets/images/default-pfp.jpg'
    }
    return this.comment.author.pfp.url
  }

  ngOnInit(): void {
  }

  delete(id: number) {
    this.loadingService.isLoading = true
    this.commentService.delete(id)
      .subscribe({
        next: () => {
          this.toastr.success('Comment deleted successfully')
          location.reload()
        },
        error: () => this.toastr.error('Error deleting comment'),
        complete: () => this.loadingService.isLoading = false
      })
  }

  canDelete(): boolean {
    if (this.comment.author == null) {
      return false
    }
    return this.userService.isAdmin() || this.userService.getUsername() == this.comment.author.username
  }
}
