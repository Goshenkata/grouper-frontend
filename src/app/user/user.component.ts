import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UiService} from "../ui.service";
import {UserService} from "../user.service";
import {UserInfo} from "./user-info";
import {ToastrService} from "ngx-toastr";
import {LoadingService} from "../loading.service";
import {ProfileWidgetComponent} from "../profile-widget/profile-widget.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public userInfo: UserInfo | null = null
  public isPrincipalProfile: boolean = false;
  public changeDescription: boolean = false;

  constructor(private route: ActivatedRoute,
              public router: Router,
              public toastr: ToastrService,
              public uiService: UiService,
              public userService: UserService,
              public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.isLoading=false
    const routeParams = this.route.snapshot.paramMap;
    let username: string = routeParams!.get('user') ?? '';
    this.userService.getInfo(username)
      .subscribe({
        next: value => {
          this.userInfo = value
          let principal = localStorage.getItem('username');
          this.isPrincipalProfile = principal == this.userInfo.name
        },
        error: () => this.router.navigateByUrl('404')
      })
  }

  onFileSelected($event: Event) {
    this.loadingService.isLoading = true
    const element = $event.target as HTMLInputElement;
    let files = element.files;
    let file = files!.item(0)
    if (file != null) {
      this.userService.uploadNewPfp(file).subscribe({
        next: () => location.reload(),
        error: () => this.toastr.error('Error uploading profile picture'),
        complete: () => this.loadingService.isLoading = false
      })
    } else {
      this.toastr.error('Error uploading profile picture')
      this.loadingService.isLoading = false
    }
  }

  removePfp() {
    this.loadingService.isLoading = true
    this.userService.removePfp()
      .subscribe({
        next: () => location.reload(),
        error: () => this.toastr.error("Can't remove profile picture, we're working on it"),
        complete: () => this.loadingService.isLoading = false
      })
    this.loadingService.isLoading = false
  }

  changeDesc() {
    this.changeDescription = false
    this.userService.changeDescription(this.userInfo!.description)
      .subscribe({
        error: err => this.toastr.error('Error updating description')
      })
  }

  checkIfBlank() {
    if (this.userInfo == null) {
      return true;
    }
    if (this.userInfo.description == null) {
      return true;
    }
    return this.userInfo.description.length <= 1;
  }
}
