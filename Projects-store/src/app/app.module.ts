import { routing } from './app.routing';
import { RequireAuth, RequireSignin } from './shared/services/authentication.service';
import { HttpService } from './shared/services/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsContentsComponent } from './projects-contents/projects-contents.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsContentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    HttpService,
    RequireAuth,
    RequireSignin
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
