import {HostListener, Injectable} from '@angular/core';
import {keyframes} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public mobile: boolean;

  constructor() {
    this.mobile = window.screen.width <= 480;
  }

  @HostListener('window:resize')
  onResize() {
    this.mobile = window.screen.width <= 480;
  }

  private getTheme(): string {
    return localStorage.getItem("theme") || "light";
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
  }

}
