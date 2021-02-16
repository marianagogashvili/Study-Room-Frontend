import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TestService {
	constructor(private http: HttpClient) {}

	createTestwork(param: Params) {
		return this.http.post(
			'http://localhost:8000/testwork/createTest', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

}