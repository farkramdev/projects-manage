import { UrlConfig } from './../../config/url.config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  Url = UrlConfig;
  constructor() { }

  ngOnInit() {
    
  }

}
