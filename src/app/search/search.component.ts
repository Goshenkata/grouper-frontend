import {Component, Input, OnInit} from '@angular/core';
import {UiService} from "../ui.service";
import {SearchType} from "./SearchType";
import {SearchService} from "../search.service";
import {query} from "@angular/animations";
import {SearchDto} from "./search.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public expand: boolean = false;
  @Input()
  public searchType: SearchType = SearchType.USER;
  @Input()
  public isLockedUser: boolean = false;
  searchTypeEnum = SearchType;
  query: string = '';
  showDropdown: boolean = false;
  result: SearchDto[] | null = null;

  constructor(public uiService: UiService,
              public searchService: SearchService,
              public router: Router) {
  }

  ngOnInit(): void {
  }

  queryFetch() {
    this.searchService
      .getQueryResult(this.query, this.searchType)
      .subscribe({
        next: value => this.result = value,
        error: err => console.error('error ' + err.status + ' when fetching search')
      })
  }

  getImageSrc(res: SearchDto): string {
    if (res.imageUrl == null) {
      switch (this.searchType) {
        case SearchType.GROUP:
          return '/assets/images/default-group.png'
        case SearchType.USER:
          return '/assets/images/default-pfp.jpg'

      }
    }
    return res.imageUrl;
  }

  select(res: SearchDto) {
    if (!this.isLockedUser) {
      this.router.navigateByUrl(this.searchType.toString().toLowerCase() + '/' + res.name)
    }
    this.query = res.name;
    this.showDropdown = false;
  }
}
