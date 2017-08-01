import { Injectable } from '@angular/core';
import {HttpService} from "app/services/http.service";

@Injectable()
export class AdvisorService {

  constructor(private http : HttpService) {}

  AddAdvisor(model) {
    return this.http.requestPost("api/add-advice", model);
  }

}
