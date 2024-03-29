import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StatsDto} from "./stats-dto";
import {StatsService} from "../stats.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LegendPosition} from "@swimlane/ngx-charts";
import {Observable, Subscription} from "rxjs";
import {UserService} from "../user.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  stats: StatsDto | undefined
  interval = setInterval(() => this.refresh(), 5000);

  constructor(
    public router: Router,
    public toastr: ToastrService,
    public statsService: StatsService,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (!this.userService.isAdmin()) {
      this.router.navigateByUrl('')
    }
    this.refresh();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  refresh() {
    this.statsService.getStats()
      .subscribe({
        next: value => {
          this.stats = value
        },
        error: () => {
          this.router.navigateByUrl('')
        },
      });
  }
}
