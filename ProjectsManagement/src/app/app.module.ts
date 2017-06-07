import { routing } from './app.routing';
import { NgModule } from '@angular/core';
import { ProjectsContentsComponent } from './components/projects-contents/projects-contents.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpService } from './services/http.service';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ValidationDirective } from './directives/validation.directive';
import { ScrollbarDirective } from './directives/scrollbar.directive';
import { SigninComponent } from './components/signin/signin.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsContentsComponent,
    ValidationDirective,
    ScrollbarDirective,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    HttpService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
