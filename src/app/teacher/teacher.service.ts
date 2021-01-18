import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TeacherService {
	error = new BehaviorSubject<string>(null);
	teacher = new BehaviorSubject<any>(null);
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

	editTeacher(param: Params) {
		return this.http.put(
			'http://localhost:8000/teacher/editTeacher', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			})
			.pipe(catchError(error => {
				console.log(error);
				return throwError(error.error);
			}));
	}

	sendTeacher(teacher) {
		this.teacher.next(teacher);
	}


	sendError(err) {
		this.error.next(err);
	}
}