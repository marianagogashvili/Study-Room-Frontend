import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import {saveAs as importedSaveAs} from "file-saver";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit, OnDestroy {
  sub: Subscription;
  loading;
  assignment;

  pdfIcon = faFilePdf;
  wordIcon = faFileWord;

  constructor(private assignmentService: AssignmentService,
  			  private route: ActivatedRoute,
  			  private router: Router) { }

  ngOnInit() {
  	console.log(this.route.parent.snapshot);
  	this.loading = true;
  	this.sub = this.route.params.pipe(map(params => {
  		return params['assignmentId'];
  	}), mergeMap((id):any => {
		return this.assignmentService.getAssignmentById({id: id});
  	})).subscribe(assignment => {
  		this.assignment = assignment;
  		this.loading = false;
  		console.log(this.assignment);
  	});

  }

  downloadImage(url) {
  	let fileUrl =  "http://localhost:8000/" + url;
  	window.open(fileUrl, '_blank');
  }

  delete() {
  	this.assignmentService
  		.deleteAssignment({id: this.assignment._id})
  		.subscribe(result => {
  			console.log(result);
  				this.router.navigate(['../../main'], {relativeTo: this.route});
  		});
  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  	console.log(this.sub);
  }
}
