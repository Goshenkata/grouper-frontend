import { Component, OnInit } from '@angular/core';
import {StatsDto} from "./stats-dto";
import {StatsService} from "../stats.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  stats: StatsDto | undefined

  constructor(
    public statsService: StatsService,
    public router: Router,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    let role: string | null = localStorage.getItem('role');
    if (role == null || role.split(',').indexOf('ROLE_ADMIN') <= -1) {
      this.router.navigateByUrl('')
    }
    this.statsService.getStats().subscribe({
      next: value => this.stats = value,
      error: err => {
        this.router.navigateByUrl('')
        this.toastr.error("Can't load statistics, we're working on the problem")
      }
    });
  }

}
