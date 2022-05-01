import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {TermsComponent} from "./terms/terms.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'terms_and_conditions', component:TermsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
