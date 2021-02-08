import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AuthGuard } from './auth-guard.service';
import { AuthGuardTeacher } from './auth-guard-teacher.service';
import { AuthGuardStudent } from './auth-guard-student.service';


import { HomeComponent } from './home/home.component';
import { EditComponent } from './student/edit/edit.component';
import { CourseComponent } from './course/course.component';
import { StudentsComponent } from './course/students/students.component';
import { MainComponent } from './course/main/main.component';
import { AddStudentComponent } from './course/add-student/add-student.component';
import { AssignmentComponent } from './course/assignment/assignment.component';
import { GradesComponent } from './student/grades/grades.component';
import { AssignmentsComponent } from './student/assignments/assignments.component';
import { MainStudentComponent } from './student/main-student/main-student.component';

const appRoutes:Routes = [
	{ path: '', component: HomeComponent},
	{ path: 'auth', component: AuthComponent },
	{ path: 'student', canActivate: [AuthGuardStudent], canActivateChild:[AuthGuardStudent], component: StudentComponent, children: [
		{ path: 'main', component: MainStudentComponent },
		{ path: 'grades', component: GradesComponent },
		{ path: 'assignments', component: AssignmentsComponent },
		
	]},
	{ path: 'teacher', canActivate: [AuthGuardTeacher], canActivateChild:[AuthGuardTeacher], component: TeacherComponent, children: [
		// { path: 'edit', component: EditComponent }
		// edit, grades
	]},
	{ path: 'course/:id', canActivate: [AuthGuard], component: CourseComponent, children: [
		{ path: 'students', canActivate: [AuthGuardTeacher], component:  StudentsComponent },
		{ path: 'main', canActivate: [AuthGuard], component:  MainComponent },
		{ path: 'add-student', canActivate: [AuthGuardTeacher], component:  AddStudentComponent },
		{ path: 'assignment/:assignmentId', canActivate: [AuthGuard], component:  AssignmentComponent },
	]}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {

}