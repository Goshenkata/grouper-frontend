import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UiService} from "../ui.service";
import {UserService} from "../user.service";
import {UserInfo} from "./user-info";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public userInfo: UserInfo | null = null
  public isPrincipalProfile: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public uiService: UiService,
              public userService: UserService) {
    const routeParams = this.route.snapshot.paramMap;
    let username: string = routeParams!.get('user') ?? '';
    userService.getInfo(username)
      .subscribe({
        next: value => {
          this.userInfo = value
          let principal = localStorage.getItem('username');
          this.isPrincipalProfile = principal == this.userInfo.name
        },
        error: () => router.navigateByUrl('404')
      })
  }

  ngOnInit(): void {
  }

}
