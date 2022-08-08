import { Component, OnInit } from '@angular/core';
import {UiService} from "../ui.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    public uiService: UiService
  ) {}

  ngOnInit(): void {
  }

}
