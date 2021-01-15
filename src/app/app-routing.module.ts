import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentAuthGuard } from './student-auth-guard.service';
import { TeacherAuthGuard } from './teacher-auth-guard.service';


const appRoutes:Routes = [
	{ path: '', redirectTo: '/auth', pathMatch: 'full'},
	{ path: 'auth', component: AuthComponent },
	{ path: 'student', canActivate:[StudentAuthGuard], component: StudentComponent, children: [
		// edit, grades
	]},
	{ path: 'teacher', canActivate:[TeacherAuthGuard], component: TeacherComponent, children: [
		// edit, grades
	]}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {

}