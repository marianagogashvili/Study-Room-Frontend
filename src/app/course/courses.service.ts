import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CoursesService {
	constructor(private http: HttpClient) {}

	getCourse(param: Params) {
		return this.http.post(
			'http://localhost:8000/course/getCourseTeacher', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}
}