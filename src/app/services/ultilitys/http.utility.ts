import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders, HttpEvent } from '@angular/common/http';

import {StorageUtility} from "./storage.utility"
@Injectable()

export class HttpUtility {

    constructor(
        private _http: HttpClient,
        private _storageUtil: StorageUtility,
    ) {
    }
    

    get(url: string, headers?: HttpHeaders): Promise<any> {
        return this.request("GET", url, null, headers);
    }

    delete(url: string, headers?: HttpHeaders): Promise<any> {
        return this.request("DELETE", url, null, headers);
    }

    head(url: string, headers?: HttpHeaders): Promise<any> {
        return this.request("HEAD", url, null, headers);
    }

    post(url: string, body: any, headers?: HttpHeaders): Promise<any> {
        return this.request("POST", url, body, headers);
    }

    put(url: string, body?: any, headers?: HttpHeaders): Promise<any> {
        return this.request("PUT", url, body, headers);
    }

    request(method: string, url: string, body?: any, headers?: HttpHeaders, custom?: boolean): Promise<any> {
        var req = new HttpRequest(method, url, body, {
            headers: custom ? this.addFormHeaders(headers) : this.addDefaultHeaders(headers),
            withCredentials: true
        })

        return this._http.request(req).toPromise()
            .then(res => {
                return this.extractData(req, res);
            })
    }

    private addDefaultHeaders(headers?: HttpHeaders): HttpHeaders {
        headers = headers || new HttpHeaders();

        headers = headers.append('Authorization', `Bearer ${this._storageUtil.get('token')}`);
        headers = headers.append('Content-Type', `application/json`);

        return headers;
    }

    private addFormHeaders(headers?: HttpHeaders): HttpHeaders {
        headers = headers || new HttpHeaders();

        headers = headers.append('Authorization', `Bearer ${this._storageUtil.get('token')}`);

        return headers;
    }

    private extractData(req: HttpRequest<any>, res: HttpEvent<any>): any {
        var httpRes = res as HttpResponse<any>;
        var body = httpRes.body;

        if (req.method === "HEAD") {
            body = {};
            body["data"] = {};

            for (let key of httpRes.headers.keys()) {
                body.data[key] = httpRes.headers.get(key);
            }
        } else {
            if (!httpRes.body.successful) {
                alert(`Error Code: ${httpRes.body.errorCode}. Error Description: ${httpRes.body.errorDescription}`);
            }
        }

        return body.data || {};
    }
}