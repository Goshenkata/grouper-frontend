import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {UiService} from "../ui.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public expand: boolean;

  constructor(public userService: UserService, public uiService: UiService) {
    this.expand=false;
  }

  ngOnInit(): void {
  }

  switchExpand() {
    this.expand = !this.expand;
  }

}
