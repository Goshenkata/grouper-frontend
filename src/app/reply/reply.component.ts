import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UiService} from "../ui.service";
import {UserService} from "../user.service";
import {ReplyTo} from "./ReplyTo";
import {Reply} from "./reply";
import {getTinymce} from "@tinymce/tinymce-angular/TinyMCE";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../comment.service";
import {ToastrService} from "ngx-toastr";
import {LoadingService} from "../loading.service";

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
  @Input()
  public isSubmit: boolean = false;
  public replyData!: Reply;
  public previewImageUrl: string | ArrayBuffer | null = null;
  imageInputId: string = Math.random().toString(36);

  public constructor(public uiService: UiService,
              public userService: UserService,
              public commentService: CommentService,
              public toastr: ToastrService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.replyData = new Reply(this.id, this.replyTo, '', null);
  }

  postReply() {
    this.loadingService.isLoading = true;
    this.commentService.postComment(this.replyData)
      .subscribe({
        next: () => this.toastr.success('comment sent'),
        error: err => (err.status == 400 ? this.toastr.error('comment cannot be blank') : this.toastr.error('Something went wrong')),
        complete: () => {
          this.loadingService.isLoading = false;
          location.reload()
        }
      });
  }

  onFileSelected($event: Event) {
    const element = $event.target as HTMLInputElement;
    let files = element.files;
    let file = files!.item(0);
    if (file != null) {
      this.replyData.image = file;
      const reader = new FileReader();
      reader.onload = e => this.previewImageUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }
}
