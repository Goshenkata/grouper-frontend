import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {UiService} from "../ui.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService, public uiService: UiService) { }

  ngOnInit(): void {
  }

}
