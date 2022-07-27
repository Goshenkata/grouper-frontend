import {Component, Input, OnInit} from '@angular/core';
import {UiService} from "../ui.service";
import {SearchType} from "./SearchType";
import {SearchService} from "../search.service";
import {SearchDto} from "./search.dto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public expand: boolean = false;
  public searchType: SearchType = this.searchService.searchType
  @Input()
  public isLockedUser: boolean = false;
  query: string = '';
  showDropdown: boolean = false;
  result: SearchDto[] | null = null;

  constructor(public uiService: UiService,
              public searchService: SearchService,
              public router: Router,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.isLockedUser) {
      this.searchType = SearchType.GROUP
    } else {
      this.searchType = this.searchService.searchType
    }
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
      this.redirectTo(this.searchType.toString().toLowerCase() + '/' + res.name)
    }
    this.query = res.name;
    this.showDropdown = false;
  }

  selectGroup() {
    if (!this.isLockedUser) {
      this.searchService.searchType = SearchType.GROUP
      this.searchType = SearchType.GROUP
      localStorage.setItem('searchType', 'GROUP')
      this.expand = false;
    }
  }

  selectUser() {
    if (!this.isLockedUser) {
      this.searchService.searchType = SearchType.USER
      this.searchType = SearchType.USER
      localStorage.setItem('searchType', 'USER')
      this.expand = false;
    }
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
