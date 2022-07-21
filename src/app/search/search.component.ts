import {Component, Input, OnInit} from '@angular/core';
import {UiService} from "../ui.service";
import {SearchType} from "./SearchType";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public expand: boolean = false;
  @Input()
  public searchType: SearchType = SearchType.USER;
  searchTypeEnum = SearchType;

  constructor(public uiService: UiService) { }

  ngOnInit(): void {
  }
}
