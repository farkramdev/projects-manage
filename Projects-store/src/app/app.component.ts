import { SessionFactory } from './shared/factories/session.factory';
import { AppFactory } from './shared/factories/application.factory';
import { HttpService } from './shared/services/http.service';
import { Router } from '@angular/router';
import { Url } from './shared/factories/url.factory';
import { Component } from '@angular/core';

@Component({
  selector: 'projects-managers',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Url = Url;
  Authentication: string = null;

  constructor(router: Router, http: HttpService) {
    AppFactory.router = router;
    AppFactory.http = http;
  }

  ngDoCheck() {
    this.Authentication = SessionFactory.getAuthentication;
    var selectpickers = document.querySelectorAll('div');
  }
}
