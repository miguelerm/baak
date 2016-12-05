import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UsuarioServicio } from "./usuario.servicio"
import { ConfigurationManager } from "../configuration.manager";

@Injectable()
export class HttpServicio {

    constructor(private http: Http, private user: UsuarioServicio) {

    }

    public get<T>(url: string): Promise<T> {
        return this.http.get(url, { headers: this.getHeaders() }).toPromise().then(response => response.json() as T).catch(this.handleError);
    }

    public post<T, U>(url: string, data: T): Promise<U> {
        return this.http.post(url, JSON.stringify(data), { headers: this.getHeaders() }).toPromise().then(response => response.json() as U).catch(this.handleError);
    }

    public putWithResponse<T, U>(url: string, data: T): Promise<U> {
        return this.http.put(url, JSON.stringify(data), { headers: this.getHeaders() }).toPromise().then(response => response.json() as U).catch(this.handleError);
    }

    public put<T>(url: string, data: T): Promise<T> {
        return this.http.put(url, JSON.stringify(data), { headers: this.getHeaders() }).toPromise().then(() => data).catch(this.handleError);
    }

    public delete(url: string) {
        return this.http.delete(url, { headers: this.getHeaders() }).toPromise().then(() => null).catch(this.handleError);
    }

    private getHeaders(): Headers {
        var token =this.user.getBearerToken();
        var headers = new Headers({'Content-Type': 'application/json'});

        if (token) {
            headers.append("Authorization", "Bearer " + token);
        }
        return headers;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}