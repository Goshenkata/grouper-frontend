import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './registration/registration.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TermsComponent } from './terms/terms.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./jwt.interceptor";
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { FeedComponent } from './feed/feed.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { PostComponent } from './post/post.component';
import { FullPostComponent } from './full-post/full-post.component';
import { CommentComponent } from './comment/comment.component';
import {CommonModule} from "@angular/common";
import {EditorModule} from "@tinymce/tinymce-angular";
import { ReplyComponent } from './reply/reply.component';
import { LoadingComponent } from './loading/loading.component';
import { ProfileWidgetComponent } from './profile-widget/profile-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrationComponent,
    TermsComponent,
    LoginComponent,
    FooterComponent,
    AboutComponent,
    FeedComponent,
    PostComponent,
    FullPostComponent,
    CommentComponent,
    ReplyComponent,
    LoadingComponent,
    ProfileWidgetComponent,
  ],
    imports: [
        CommonModule,
        EditorModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        InfiniteScrollModule,
        ReactiveFormsModule
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
