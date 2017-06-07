import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class AuthenticationService {

    private authorizationKey: string = 'authorization';
    private authenticated: string;

    // get realtime authenticated : แสดงข้อมูล authenticated เมื่อมี event เกิดขึ้น
    public getAuthenticatedEvent: EventEmitter<string> = new EventEmitter<string>();

    // set authenticated : เซตข้อมูลใส่ authenticated
    setAuthenticated(name: string): void {
        this.authenticated = name;
        this.storage.setItem(this.authorizationKey, this.authenticated);
        this.getAuthenticatedEvent.emit(this.authenticated);
    }

    setAuthenticatedByKey(key: string): any {
        return this.storage.getItem(key);
    }

    // remove data authenticated : นำข้อมูลออกจาก  authenticated
    destroyAuthenticated() {
        this.authenticated = null;
        this.storage.clear();
        this.getAuthenticatedEvent.emit(this.authenticated);
    }

    // remove data authenticated key : นำข้อมูลออกจาก  authenticated key
    destroyAuthenticatedByKey(key:any) {
        this.authenticated = null;
        this.storage.removeItem(key || this.authorizationKey);
        this.getAuthenticatedEvent.emit(this.authenticated);
    }

    // get authenticated : แสดงข้อมูล authenticated
    get getAuthenticated(): string {
        this.authenticated = this.storage.getItem(this.authorizationKey);
        return this.authenticated;
    }

    // Convert localStorage to clien session : แปลงข้อมูล localStorage
    public get storage(): Storage {
        return localStorage;
    }

}