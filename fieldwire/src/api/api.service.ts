import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import {catchError} from 'rxjs/operators';

@Injectable()
export class ApiService {
    // api: string = 'https://api.imgur.com/3/gallery/search/?sort=top&window=all&page=1&q=cats';
    api: string = 'https://api.imgur.com/3/gallery/search/';
    httpOptions = {
        headers: new HttpHeaders({ 'Authorization': 'Client-ID b067d5cb828ec5a' }),
    };

    constructor(
        private http: HttpClient,
    ) { }

    getAll(searchQuery, sort?, window?, page?, ): Observable<any> {
        let params = new HttpParams().set('q', searchQuery);
        if (sort) {
            params = params.append('sort', sort);
        }
        if (window && sort === 'Top') {
            params = params.append('window', window);
        }
        if (page) {
            params = params.append('page', page);
        }
        console.log(this.httpOptions);
        console.log(params);
        return this.http.get(this.api, { headers: this.httpOptions.headers, params: params }).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.log(error.error.message);
        } else {
            console.log(error.status);
        }
        return throwError(
            console.log('Something is wrong!')
        );
    };
}