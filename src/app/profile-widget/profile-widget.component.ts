import { Component, OnInit } from '@angular/core';
import {UiService} from "../ui.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.css']
})
export class ProfileWidgetComponent implements OnInit {
  expand: boolean = false;
  hover: boolean = false;

  constructor(public uiService: UiService,
              public userService: UserService) { }

  ngOnInit(): void {
  }

}
