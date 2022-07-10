import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";
import {UiService} from "../ui.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public expand: boolean;
  public hoverThemeButton: boolean = false;


  constructor(public userService: UserService,
              public uiService: UiService) {
    this.expand=false;
  }

  ngOnInit(): void {
  }

  switch(): void {
    this.uiService.switchTheme();
  }

  ExpandEv() {
    this.expand = !this.expand;
  }

}
