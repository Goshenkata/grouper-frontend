import {Component, OnInit} from '@angular/core';
import {RegistrationForm} from "./RegistrationForm";
import {UserService} from "../user.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UiService} from "../ui.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  model: RegistrationForm = new RegistrationForm('', '', '', '', false);

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              public uiService: UiService) {
    if (userService.isLoggedIn()) {
      this.router.navigateByUrl('')
    }
  }

  ngOnInit(): void {
  }

  escapeRegExp(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  register() {
    this.userService.registerUser(this.model).subscribe({
      complete: () => {
        this.toastr.success("Registration successful, welcome!");
        this.router.navigate(["/login"])
      }, error: (err: HttpErrorResponse) => {
        this.toastr.error(err.status == 400 ? err.error : 'Something went wrong, try again later');
        console.log(err)
      }
    });
  }
}
