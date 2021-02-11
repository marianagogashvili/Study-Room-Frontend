import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class StudentService {
	error = new BehaviorSubject<string>(null);
	student = new BehaviorSubject<any>(null);

	constructor(private http: HttpClient) {}

	getStudent() {
		return this.http.get(
			'http://localhost:8000/student/getStudent', 
			{
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			})
			.pipe(catchError(error => {
				return throwError(error.error);
			}));
	}

	editStudent(param: Params) {
		return this.http.put(
			'http://localhost:8000/student/editStudent', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			})
			.pipe(catchError(error => {
				return throwError(error.error);
			}));
	}

	sendStudent(student) {
		this.student.next(student);
	}

	sendError(err) {
		this.error.next(err);
	}
}