import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {UiService} from "../ui.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public uiService: UiService) { }

  ngOnInit(): void {
  }

}
