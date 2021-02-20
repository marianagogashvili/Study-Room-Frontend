import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TestService {
	// testwork = new BehaviorSubject<string>(null);
	constructor(private http: HttpClient) {}

	createTestwork(param: Params) {
		return this.http.post(
			'http://localhost:8000/testwork/createTest', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			})
	}

	updateTestwork(param: Params) {
		return this.http.post(
			'http://localhost:8000/testwork/updateTest', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			})
	}

	deleteTestwork(param: Params) {
		return this.http.post(
			'http://localhost:8000/testwork/deleteTest', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			})
	}


	getTestwork(param: Params) {
		return this.http.post(
			'http://localhost:8000/testwork/getTest', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			})
	}

	saveAnswers(param: Params) {
		return this.http.post(
			'http://localhost:8000/testAnswer/saveAnswers', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			})
	}

	getAnswers(param: Params) {
		return this.http.post(
			'http://localhost:8000/testAnswer/getAnswers', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			})
	}
	// sendEditTest(testwork) {
	// 	this.testwork.next(testwork);
	// }
}