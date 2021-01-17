import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './student/edit/edit.component';

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
	]}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})

export class AppRoutingModule {

}