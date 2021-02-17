import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-testwork',
  templateUrl: './testwork.component.html',
  styleUrls: ['./testwork.component.css']
})
export class TestworkComponent implements OnInit {
  testwork;
  loading;

  constructor(private testworkService: TestService,
  			  private route: ActivatedRoute,
  			  private router: Router) { }

  ngOnInit() {
  	this.loading = true;
  	this.route.queryParams.subscribe(params => {
  		this.testworkService
  		.getTestwork({testId: params['testId']}).subscribe(testwork => {
  			console.log(testwork);
  			this.testwork = testwork;
  			this.loading = false;
  		});
  	});
  	
  }

}
