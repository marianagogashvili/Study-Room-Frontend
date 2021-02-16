import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TopicService {
	oldTopics = new BehaviorSubject<string>(null);
	constructor(private http: HttpClient) {}

	createTopic(param: Params) {
		return this.http.post(
			'http://localhost:8000/topic/createTopic', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	getTopics(param: Params) {
		return this.http.post(
			'http://localhost:8000/topic/getTopics', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	editTopic(param: Params) {
		return this.http.post(
			'http://localhost:8000/topic/editTopic', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	deleteTopic(param: Params) {
		return this.http.post(
			'http://localhost:8000/topic/deleteTopic', 
			JSON.stringify(param), {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('token')
				})
			});
	}

	sendTopics(topics) {
		this.oldTopics.next(topics);
	}

}