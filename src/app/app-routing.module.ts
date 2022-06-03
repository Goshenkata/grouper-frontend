import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {TermsComponent} from "./terms/terms.component";
import {LoginComponent} from "./login/login.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'terms_and_conditions', component:TermsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
