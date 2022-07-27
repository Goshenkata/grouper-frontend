import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../group.service";
import {GroupInfo} from "./group-info";
import {UiService} from "../ui.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  public groupInfo: GroupInfo | null = null;


  constructor(private route: ActivatedRoute,
              private router: Router,
              public uiService: UiService,
              public groupService: GroupService) {
    const routeParams = this.route.snapshot.paramMap;
    let group: string = routeParams!.get('group') ?? '';
    groupService.getInfo(group)
      .subscribe({
        next: value => this.groupInfo = value,
        error: () => router.navigateByUrl('404')
      })
  }

  ngOnInit(): void {
  }

}
