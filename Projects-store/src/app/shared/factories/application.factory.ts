import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
export class AppFactory {
	static router: Router;
	static http: HttpService;
	static acc_id:number;
}