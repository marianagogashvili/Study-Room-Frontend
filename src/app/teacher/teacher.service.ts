import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TeacherService {
	error = new BehaviorSubject<string>(null);
	constructor(private http: HttpClient) {}

	getTeacher(param: Params) {
		return this.http.post(
			'http://localhost:8000/teacher/getTeacher', 
			JSON.stringify(param), 
			{
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			}).pipe(catchError(error => {
				return throwError(error.error);
			}));
	}

	sendError(err) {
		this.error.next(err);
	}
}