import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
	constructor(private http: HttpClient) {}

	register(param: Params) {
		return this.http.post(
			'http://localhost:8000/auth/register', 
			JSON.stringify(param),
			{
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				})
			}).pipe(catchError(error => {
				return throwError(error.error.data);
			}));
	}

	login(param: Params) {
		return this.http.post(
			'http://localhost:8000/auth/login',
			JSON.stringify(param),
			{
				headers: new HttpHeaders({
					'Content-Type': 'application/json'
				})
			}).pipe(catchError(error => {
				return throwError(error.error.data);
			}));
	}
}