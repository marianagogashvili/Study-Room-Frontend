import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';

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
			});
	}
}