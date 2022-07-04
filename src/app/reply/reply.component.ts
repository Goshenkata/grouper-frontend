import {Component, Input, OnInit} from '@angular/core';
import {UiService} from "../ui.service";
import {UserService} from "../user.service";
import {ReplyTo} from "./ReplyTo";
import {Reply} from "./reply";
import {getTinymce} from "@tinymce/tinymce-angular/TinyMCE";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../comment.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input()
  public replyTo!: ReplyTo
  @Input()
  public id!: number;
  public replyData!: Reply;

  constructor(public uiService: UiService,
              public userService: UserService,
              public commentService: CommentService,
              public toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.replyData = new Reply(this.id, this.replyTo, '', null);
  }

  postReply() {
    this.commentService.postComment(this.replyData)
      .subscribe({
       error: err => (err.error == 400 ? this.toastr.error('comment cannot be blank') : this.toastr.error('Something went wrong')),
        complete: () => this.toastr.success('comment sent')
      });
  }

  onFileSelected($event: Event) {
    const element = $event.target as HTMLInputElement;
    let files = element.files;
    if (files != null) {
      this.replyData.image = files.item(0)
    }
  }
}
