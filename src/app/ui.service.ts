import { Injectable } from '@angular/core';
import {keyframes} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor() { }

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
