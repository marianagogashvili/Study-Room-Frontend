import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './student/edit/edit.component';
import { CourseComponent } from './course/course.component';
import { StudentsComponent } from './course/students/students.component';
import { MainComponent } from './course/main/main.component';
import { AddStudentComponent } from './course/add-student/add-student.component';

const appRoutes:Routes = [
	{ path: '', component: HomeComponent},
	{ path: 'auth', component: AuthComponent },
	{ path: 'student', canActivate: [AuthGuard], canActivateChild:[AuthGuard], component: StudentComponent, children: [
		// { path: 'edit', component: EditComponent }
		// grades
		
	]},
	{ path: 'teacher', canActivate: [AuthGuard], canActivateChild:[AuthGuard], component: TeacherComponent, children: [
		// { path: 'edit', component: EditComponent }
		// edit, grades
	]},
	{ path: 'course/:id', canActivate: [AuthGuard], canActivateChild:[AuthGuard], component: CourseComponent, children: [
		{ path: 'students', component:  StudentsComponent },
		{ path: 'main', component:  MainComponent },
		{ path: 'add-student', component:  AddStudentComponent },

	]}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {

}