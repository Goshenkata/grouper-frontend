import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../post.service";
import {FullPost} from "./full-post";
import {ToastrService} from "ngx-toastr";
import {Post} from "../post/post";

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.css']
})
export class FullPostComponent implements OnInit {
  fullPost!: FullPost;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private toastr: ToastrService,
              private router: Router) {
    const routeParams = this.route.snapshot.paramMap;
    const postId: number = Number(routeParams.get('postId'));
    postService.getById(postId)
      .subscribe({
        next: value => this.fullPost = value,
        error: err => {
          this.toastr.error(err.status == 404 ? '404: Post not found' : 'Something went wrong, try again later')
          this.router.navigate([""]);
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
      groupName: this.fullPost.groupName,
      id: this.fullPost.id,
      image: this.fullPost.image,
      postAuthor: this.fullPost.postAuthor,
      postType: this.fullPost.postType,
      title: this.fullPost.title,
    }
  }
}
