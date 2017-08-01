import {HttpService} from './../../services/http.service';
import {Injectable} from '@angular/core';

@Injectable()
export class DepartmentsService {

  constructor(private http : HttpService) {}

  AddDep(model) {
    return this.http.requestPost("api/adddep", model);
  }

}
