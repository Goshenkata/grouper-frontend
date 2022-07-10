import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {TermsComponent} from "./terms/terms.component";
import {LoginComponent} from "./login/login.component";
import {AboutComponent} from "./about/about.component";
import {FeedComponent} from "./feed/feed.component";
import {FullPostComponent} from "./full-post/full-post.component";
import {SubmitPostComponent} from "./submit-post/submit-post.component";

const routes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'terms_and_conditions', component:TermsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: '', component: FeedComponent},
  {path: 'post/:postId', component: FullPostComponent},
  {path: 'submit', component: SubmitPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
