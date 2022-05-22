import {Component} from '@angular/core';
import {faEnvelope, faKey, faLock, faMoon, faSearch, faSun, faUser} from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {UiService} from "./ui.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grouper-frontend';
  constructor(library: FaIconLibrary,
              public uiService: UiService) {
    library.addIcons(
      faMoon,
      faUser,
      faLock,
      faEnvelope,
      faKey,
      faSearch,
      faSun
    );
  }
}
