import { Component, Input, OnInit } from '@angular/core';
import { SolutionService } from '../../solution.service';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {
  @Input() assignment;
  groupSolutions;
  pdfIcon = faFilePdf;
  wordIcon = faFileWord;

  gradeForm: FormGroup;

  gradeMode;
  gradeIndex;

  constructor(private solutionService: SolutionService) { }

  ngOnInit() {
  	this.gradeForm = new FormGroup({
  		'grade': new FormControl('', Validators.required),
  		'comment': new FormControl(''),
  	});

  	this.solutionService.getSolutions({id: this.assignment._id}).subscribe((result: {students, solutions}) => {
  		result.students.forEach(student => {
			result.solutions.filter(s =>  {
				if (s.student.toString() === student._id.toString()) {
					console.log(true);
					student['solutions'] = s;
				}
			});
		});
  		this.groupSolutions = result.students;
		console.log(this.groupSolutions);

  	});
  }

  saveGrade(id) {
  	const grade = this.gradeForm.value.grade;
  	const comment = this.gradeForm.value.comment;
  	let solution: {grade, comment} = this.groupSolutions[this.gradeIndex].solutions;

  	if (grade <= this.assignment.maxGrade) {
  		if (grade !== solution.grade || comment !== solution.comment) {
	  		this.solutionService.gradeSolution({
		  		assignmentId: this.assignment._id,
		  		studentId: id,
		  		grade: grade,
		  		comment: comment
		  	}).subscribe(result => {
		  		this.groupSolutions[this.gradeIndex].solutions.grade = grade;
		  		this.groupSolutions[this.gradeIndex].solutions.comment = comment;
		  		this.gradeIndex =  null
		  		this.gradeMode = false;
		  	});
	  }
  	} else {
  		this.gradeForm.controls['grade'].setErrors({ 'incorrect': true });
  	}

  	
  }

  showGradeMode(index) {
  	this.gradeMode = true;
  	this.gradeIndex = index; 
  	let solution: {grade, comment} = this.groupSolutions[index].solutions;

  	if (solution) {
  		this.gradeForm.patchValue({'grade': solution.grade ? solution.grade : '', 
  		'comment': solution.comment ? solution.comment : ''});
  	} else {
  		this.gradeForm.patchValue({'grade': '', 'comment': ''});
  	}
  	
  }

  hideGradeMode(index) {
  	this.gradeMode = false;
  	this.gradeIndex = null; 
  }


  downloadSolution(url) {
  	let fileUrl =  "http://localhost:8000/" + url;
  	window.open(fileUrl, '_blank');
  }

}
