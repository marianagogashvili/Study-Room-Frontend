import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SolutionService {
	constructor(private http: HttpClient) {}

	getSolution(param: Params) {
		return this.http.post(
			'http://localhost:8000/solution/getSolutionStudent', 
			param, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	getSolutions(param: Params) {
		return this.http.post(
			'http://localhost:8000/solution/getSolutionsTeacher', 
			param, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}


	updateSolution(param: Params) {
		return this.http.post(
			'http://localhost:8000/solution/updateSolutionStudent', 
			param, {
				headers: new HttpHeaders({
					// 'Content-Type': 'application/json',
					'Accept': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	gradeSolution(param: Params) {
		return this.http.post(
			'http://localhost:8000/solution/updateSolutionTeacher', 
			param, {
				headers: new HttpHeaders({
					// 'Content-Type': 'application/json',
					'Accept': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}


	deleteSolution(param: Params) {
		return this.http.post(
			'http://localhost:8000/solution/deleteSolution', 
			param, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	createSolution(param: Params) {
		return this.http.post(
			'http://localhost:8000/solution/createSolution', 
			param, {
				headers: new HttpHeaders({
					// 'Content-Type': 'application/json',
					'Accept': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

}