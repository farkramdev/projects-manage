import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/rx';
// import { SessionFactory } from '../factories/session.factory';
// import { AppFactory } from '../factories/application.factory';
// import { Url } from '../factories/url.factory';
declare const btc_config: { domain: string };
@Injectable()
export class HttpService {

	constructor(private http: Http) { }
	public domain = btc_config.domain;

	// GET Request
	public requestGet(url: string): Observable<Response> {
		return this.http.get(`${this.domain + url}`, this.onRequestHeader())
			.map(res => this.onMapping(res))
			.do(res => this.onProcess(res))
			.catch(res => this.onErrorHandle(res));
	}

	// POST Request
	public requestPost(url: string, data: any): Observable<Response> {
		return this.http.post(`${this.domain + url}`, data, this.onRequestHeader())
			.map(res => this.onMapping(res))
			.do(res => this.onProcess(res))
			.catch(res => this.onErrorHandle(res));
	}

	// PUT Request overide by Farkram Dev
	public requestPut(url: string, data: any): Observable<Response> {
		return this.http.put(`${this.domain + url}`, data, this.onRequestHeader())
			.map(res => this.onMapping(res))
			.do(res => this.onProcess(res))
	}

	// Mapping data
	private onMapping(response: Response) {
		var responseData: any = {};
		try { responseData = response.json(); }
		catch (e) { responseData = response.text(); }
		return responseData;
	}

	// Process data
	private onProcess(response: Response): void {
		try {
			var _response = <any>response;
			if (_response.token) SessionFactory.setAuthentication(_response.token);
		}
		catch (e) { }
	}

	// Error handle
	private onErrorHandle(response: Response): Observable<Response> {
		let errorText = '';
		switch (response.status) {
			case 500:
				errorText = 'Server Error.';
				break;
			case 401:
				errorText = 'Authorization Required.';
				if (SessionFactory.getAuthentication) {
					SessionFactory.removeAll();
					AppFactory.router.navigate(['/', Url.Signin]);
				}
				break;
			case 404:
				errorText = 'Not Found.';
				break
			case 422:
				errorText = response.statusText;
				break;
			case 0:
			default:
				errorText = 'Connect network error.';
				break;
		}
		return Observable.throw(response);
	}

	// Send Request headers
	private onRequestHeader(): RequestOptionsArgs {
		var headers = new Headers();
		// send header for authentication
		if (SessionFactory.getAuthentication)
			headers.append('Authorization', SessionFactory.getAuthentication);
		// request header content-type application/json
		headers.append('Content-Type', 'application/json');
		return { headers };
	}
}