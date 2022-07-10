import {Component, OnInit} from '@angular/core';
import {UiService} from "../ui.service";
import {UserService} from "../user.service";
import {ProfileWidgetDto} from "./profile-widget-dto";
import {ToastrService} from "ngx-toastr";


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
              public toastr: ToastrService) {
    userService.getProfileWidget()
      .subscribe({
        next: value => this.profileWidgetDTO = value,
        error: err => this.toastr.error('Error ' + err.status)
      });
  }

  ngOnInit(): void {
  }

}
