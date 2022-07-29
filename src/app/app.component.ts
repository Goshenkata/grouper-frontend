import {Component, OnInit} from '@angular/core';
import {
  faArrowTrendUp,
  faBars,
  faClose,
  faEnvelope,
  faKey,
  faLock,
  faMoon, faPen, faReply,
  faSearch,
  faSun, faTrash,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {UiService} from "./ui.service";
import {faAngular, faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'grouper-frontend';

  constructor(library: FaIconLibrary,
              public uiService: UiService,
              public userService: UserService) {
    library.addIcons(
      faMoon,
      faUser,
      faLock,
      faEnvelope,
      faKey,
      faSearch,
      faSun,
      faGithub,
      faLinkedin,
      faAngular,
      faBars,
      faClose,
      faReply,
      faPen,
      faArrowTrendUp,
      faTrash
    );
  }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.updateRoles()
    }
  }

  updateRoles() {
    this.userService.updateRoles()
      .subscribe({
        next: roles => localStorage.setItem('role', roles.roles.toString())
      })
  }
}
