import { Component, Input, OnInit } from '@angular/core';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { SolutionService } from '../../solution.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  @Input() userType;
  @Input() assignment;
  solution; 
  deadlineDate;
  currentDate = new Date(new Date().setHours(new Date().getHours() + 2));
  available;

  minusIcon = faMinusCircle;
  pdfIcon = faFilePdf;
  wordIcon = faFileWord;

  solutionFiles = [];
  solutionFilesToCreate = [];
  removeFiles = [];
  addFiles = []; 

  error;

  uploadMode;
  editMode;


  constructor(private solutionService: SolutionService) { }

  ngOnInit() {
  	this.uploadMode = false;
  	this.editMode = false;

  	if (this.assignment.deadline) {
  		this.available =  this.currentDate < new Date(this.assignment.deadline);
  		this.deadlineDate = new Date(new Date(this.assignment.deadline).setHours(new Date(this.assignment.deadline).getHours() - 2));
  	} else {
  		this.available = true;
  	}

  	console.log(this.available);


  	this.solutionService.getSolution({
	  		assignmentId: this.assignment._id, 
	  		studentId: localStorage.getItem('userId')}
  		).subscribe((solution: {fileUrl}) => {
  			if (solution) {
  				this.solution = solution;
	  			this.solutionFiles = solution.fileUrl;
	  			console.log(solution);
  			}
  			
  		});
  }

  showUploadMode() {
  	this.solutionFilesToCreate = [];
  	this.uploadMode = !this.uploadMode;
  }

  showEditMode() {
  	this.addFiles = [];
	this.removeFiles = [];
  	this.editMode = !this.editMode;
  }

  saveEdit() {
  	let formData: FormData = new FormData();
  	formData.append('dest', 'solution');
  	formData.append('assignmentId', this.assignment._id);
  	formData.append('studentId', localStorage.getItem('userId'));
  	formData.append('remove', JSON.stringify(this.removeFiles));
  	this.addFiles.forEach(file => {
  		formData.append('file', file, file.name);
  	});
  	this.solutionService.updateSolution(formData).subscribe((result: {fileUrl}) => {
  		this.editMode = false;
  		this.solution = result;
  		this.solutionFiles = result.fileUrl;
  	});
  	console.log(this.removeFiles);
  	console.log(this.addFiles);

  }

  saveUpload() {
  	let formData: FormData = new FormData();
  	formData.append('assignmentId', this.assignment._id);
  	formData.append('studentId', localStorage.getItem('userId'));
  	formData.append('dest', 'solution');
  	this.solutionFilesToCreate.forEach(file => {
  		formData.append('file', file, file.name);
  	});
  	this.solutionService.createSolution(formData)
  	.subscribe((result: {fileUrl}) => {
  		this.uploadMode = false;
  		this.solution = result;
  		this.solutionFiles = result.fileUrl;
  	})
  }

  downloadSolution(url) {
  	let fileUrl =  "http://localhost:8000/" + url;
  	window.open(fileUrl, '_blank');
  }

  addFileCreate(event) {
  	let files: FileList = event.target.files;
  	let file = files[0];
  	let size = 0;
  	this.solutionFilesToCreate.forEach(f => {
  		size += f.size;
  	});
  	size += file.size;
  	if (size / 1000000 >  10) {
  		this.error = "Sorry you've reached the limit";
  		setTimeout(() => {
  			this.error = null;
  		}, 2000);
  	} else {
  		this.solutionFilesToCreate.push(file);
  	}
  	console.log(this.solutionFilesToCreate);
  }

  addFileUpdate(event) {
  	let files: FileList = event.target.files;
  	let file = files[0];
  	let size = 0;
  	this.addFiles.forEach(f => {
  		size += f.size;
  	});
  	size += file.size;
  	if (size / 1000000 >  10) {
  		this.error = "Sorry you've reached the limit";
  		setTimeout(() => {
  			this.error = null;
  		}, 2000);
  	} else {
  		this.addFiles.push(file);
  	}
  	console.log(this.addFiles);
  }

  removeFileFromCreate(index) {
  	this.solutionFilesToCreate.splice(index, 1);
  }

  removeFileFromDefault(file, index) {
  	this.removeFiles.push(file);
  	this.solutionFiles.splice(index, 1);
  }

  removeFileFromUpdate(index) {
  	this.addFiles.splice(index, 1);
  }

  delete() {
  	this.solutionService.deleteSolution({
	  		assignmentId: this.assignment._id, 
	  		studentId: localStorage.getItem('userId')
	  	}).subscribe(result => {
	  		this.solution = null;
	});
  }
}
