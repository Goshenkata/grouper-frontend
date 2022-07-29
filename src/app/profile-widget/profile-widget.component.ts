import {Component, OnInit} from '@angular/core';
import {UiService} from "../ui.service";
import {UserService} from "../user.service";
import {ProfileWidgetDto} from "./profile-widget-dto";
import {ToastrService} from "ngx-toastr";
import {NavigateService} from "../navigate.service";


@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.css']
})
export class ProfileWidgetComponent implements OnInit {
  expand: boolean = false;
  hover: boolean = false;
  profileWidgetDTO: ProfileWidgetDto = {username: '', pfpUrl: null};

  constructor(public uiService: UiService,
              public userService: UserService,
              public navigateService: NavigateService) {
  }

  ngOnInit(): void {
    this.userService.getProfileWidget()
      .subscribe({
        next: value => this.profileWidgetDTO = value,
      });
  }

  goToProfile() {
    this.navigateService.redirectTo('user/' + this.userService.getUsername())
  }
}
