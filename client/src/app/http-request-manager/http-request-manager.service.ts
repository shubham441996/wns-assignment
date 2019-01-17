import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpRequestManagerService {
    constructor(private httpClient: HttpClient) { }

    // Get Method
    get(url: string) {
     return this.httpClient.get(url);
    }

}