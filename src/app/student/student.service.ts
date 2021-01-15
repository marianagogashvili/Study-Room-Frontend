import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';

@Injectable({providedIn: 'root'})
export class StudentService {
	constructor(private http: HttpClient) {}

	getStudent(param: Params) {
		return this.http.post('http://localhost:8000/student', 
			JSON.stringify(param));
	}
}