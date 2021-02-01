import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AssignmentService {
	constructor(private http: HttpClient) {}

	createAssignment(param: Params) {
		return this.http.post(
			'http://localhost:8000/assignment/createAssignment', 
			param, {
				headers: new HttpHeaders({
					// 'Content-Type': 'application/json',
					'Accept': 'application/json',
					// 'Content-Type': 'multipart/form-data',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	getAssignmentsByCourse(param: Params) {
		return this.http.post(
			'http://localhost:8000/assignment/getAssignmentsByCourse', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

}