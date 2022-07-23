import { Component, OnInit } from '@angular/core';
import {SubmitForm} from "./submit-form";

@Component({
  selector: 'app-submit-post',
  templateUrl: './submit-post.component.html',
  styleUrls: ['./submit-post.component.css']
})
export class SubmitPostComponent implements OnInit {

  model : SubmitForm = new SubmitForm('',null,'','')

  constructor() { }

  ngOnInit(): void {
  }

}
