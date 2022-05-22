import {Component, OnInit} from '@angular/core';
import {LoginForm} from "./LoginForm";
import {UserService} from "../user.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {UiService} from "../ui.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: LoginForm = new LoginForm('', '')

  constructor(public userService: UserService,
              private toastr: ToastrService,
              public uiService: UiService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.model).subscribe({
      next: res => {
        console.log(res)
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem('refresh_token', res.refresh_token)
        localStorage.setItem('expires_at', res.expires_at.toString())
        localStorage.setItem('expires_at', res.username)
        this.toastr.success('successfully logged in')
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error(err.status == 401 ? 'Wrong email or password' : 'Something went wrong, try again later')
      }
    });
  }

}
