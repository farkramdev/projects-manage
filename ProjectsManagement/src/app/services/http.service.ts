import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpService {
    constructor(private http: Http, private authenticated: AuthenticationService) { }

    // Request to server by GET method : ส่งข้อมูลไปยัง server ผ่าน method GET
    requestGet(url: string): Observable<Response> {
        return this.onProcessRequest(this.http.get(this.convertURL(url), { headers: this.onRequestHeaders() }));
    }

    // Request to server by POST method : ส่งข้อมูลไปยัง server ผ่าน method POST
    requestPost(url: string, model: any): Observable<Response> {
        return this.onProcessRequest(this.http.post(this.convertURL(url), model, { headers: this.onRequestHeaders() }));
    }

    // Request to server by PUT method : ส่งข้อมูลไปยัง server ผ่าน method PUT
    requestPut(url: string, model: any): Observable<Response> {
        return this.onProcessRequest(this.http.put(this.convertURL(url), model, { headers: this.onRequestHeaders() }));
    }

    // Request to server by DELETE method : ส่งข้อมูลไปยัง server ผ่าน method DELETE
    requestDelete(url: string): Observable<Response> {
        return this.onProcessRequest(this.http.delete(this.convertURL(url), { headers: this.onRequestHeaders() }));
    }

    // Process map data : ตรวจสอบข้อมูลและแปลงเป็น Json 
    private onMapData(response: Response): ResponseModel {
        let responseData: any = {};
        try { responseData.data = response.json(); }
        catch (e) { responseData.data = response.text(); }
        responseData.status = response.status;
        responseData.statusText = response.statusText;
        responseData.response = response;
        return responseData;
    }

    // Error handle : ส่ง error ออกไปเมื่อ server เกิดข้อผิดพลาด
    private onErrorHandle(response: any): Observable<Response> {
        return Observable.throw(response);
    }

    // Request Headers : ส่งค่า Header เพื่อให้ Server รู้ว่าเราต้องการอะไร และเพื่อยืนยันตัวตน
    private onRequestHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        if (this.authenticated.getAuthenticated)
            headers.append('Authorization', this.authenticated.getAuthenticated);
        return headers;
    }

    // Convert Url : แปลงค่า Url เป็นค่าที่เรากำหนดไว้
    private convertURL(url: string): string {
        return url[0] == '/' ? this.address + url : this.address + '/' + url;
    }

    // Process request of http : เปลี่ยนการทำงานหลังจากที่มีการ Request ไปที่ server
    private onProcessRequest(httpProcess: Observable<Response>): Observable<Response> {
        return httpProcess
            .map(res => this.onMapData(res))
            .catch(res => this.onErrorHandle(res));
    }

    // Check domain is production or development : เช็คว่าที่อยู่เป็นอะไร ถ้าเรา build เป็น production หรือ development

    // private address: string = environment.production ? '/api' : 'http://localhost:24480';
    private address: string = 'http://dev.9t.com';
}

// Custom response class : สร้างคลาส Response ขึ้นมาเอง
class ResponseModel {
    status: number;
    statusText: string;
    data: any;
    response: Response;
}