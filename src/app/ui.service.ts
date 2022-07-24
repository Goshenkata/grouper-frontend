import {EventEmitter, HostListener, Injectable, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public mobile: boolean;
  public theme: string;

  constructor() {
    this.mobile = window.screen.width <= 480;
    this.theme='light'
  }

  @HostListener('window:resize')
  onResize() {
    this.mobile = window.screen.width <= 480;
  }

  public getTheme(): string {
    this.theme = localStorage.getItem("theme") || "light";
    return this.theme;
  }

  public isDarkMode(): boolean {
    return this.getTheme() == "dark"
  }

  public isLightMode(): boolean {
    return !this.isDarkMode()
  }

  public switchTheme(): void {
    if (this.isDarkMode()) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    //tinymc cannot change theme dynamically so it must be reloaded
    if(/^(\/post\/\d)$/.test(location.pathname) || /^(\/submit)$/.test(location.pathname)) {
      location.reload();
    }
  }

}
