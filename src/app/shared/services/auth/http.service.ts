import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

const apiUrl = environment.apiUrl;
@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(public http: HttpClient) {}
    public get(path: string): Observable<any> {
        const url = `${path}`;
        return this.http.get(url);
    }
    public getApiCall(path: string): Observable<any> {
        const url = `${apiUrl}${path}`;
        return this.http.get(url);
    }
    public postApiCall(path: string, data: any): Observable<any> {
        const url = `${apiUrl}${path}`;
        return this.http.post(url, data);
    }
    public putApiCall(path: string, data: any): Observable<any> {
        const url = `${apiUrl}${path}`;
        return this.http.put(url, data);
    }
    public deleteApiCall(path: string): Observable<any> {
        const url = `${apiUrl}${path}`;
        return this.http.delete(url);
    }
}
