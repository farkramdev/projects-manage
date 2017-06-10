import { RoutingModule } from './app.routing';
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
import { DepartmentsComponent } from './components/departments/departments.component';
import { HomeComponent } from './components/home/home.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AdvisorComponent } from './components/advisor/advisor.component';
import { StudentsComponent } from './components/students/students.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsContentsComponent,
    ValidationDirective,
    ScrollbarDirective,
    SigninComponent,
    DepartmentsComponent,
    HomeComponent,
    SubjectsComponent,
    AdvisorComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [
    HttpService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
