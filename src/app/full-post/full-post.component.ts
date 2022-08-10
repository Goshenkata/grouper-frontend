import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../post.service";
import {FullPost} from "./full-post";
import {ToastrService} from "ngx-toastr";
import {Post} from "../post/post";
import {ReplyTo} from "../reply/ReplyTo";
import {UserService} from "../user.service";

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent implements OnInit {
  fullPost!: FullPost;
  public ReplyTo = ReplyTo;

  constructor(private route: ActivatedRoute,
              public userService: UserService,
              private postService: PostService,
              private toastr: ToastrService,
              private router: Router) {
    const routeParams = this.route.snapshot.paramMap;
    const postId: number = Number(routeParams.get('postId'));
    postService.getById(postId)
      .subscribe({
        next: value => this.fullPost = value,
        error: err => {
          if (err.status == 404) {
            this.router.navigateByUrl('404');
          } else {
            this.toastr.error()
          }
          this.router.navigateByUrl('/');
        }
      });
  }

  ngOnInit(): void {
  }

  getPost(): Post {
    return {
      commentCount: this.fullPost.commentCount,
      content: this.fullPost.content,
      created: this.fullPost.created,
      group: this.fullPost.group,
      id: this.fullPost.id,
      image: this.fullPost.image,
      postAuthor: this.fullPost.postAuthor,
      postType: this.fullPost.postType,
      title: this.fullPost.title,
    }
  }
}
