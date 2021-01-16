import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';

const appRoutes:Routes = [
	{ path: '', component: HomeComponent},
	{ path: 'auth', component: AuthComponent },
	{ path: 'student', canActivate:[AuthGuard], component: StudentComponent, children: [
		// edit, grades
	]},
	{ path: 'teacher', canActivate:[AuthGuard], component: TeacherComponent, children: [
		// edit, grades
	]}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {

}