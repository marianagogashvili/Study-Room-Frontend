import { Router, RouterStateSnapshot, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TeacherAuthGuard implements CanActivate {

	constructor(private router: Router,
				private authService: AuthService) {}

	canActivate(route: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const user = localStorage.getItem('userId');
		const token = localStorage.getItem('token');
		const type = localStorage.getItem('type');

		if (user && token && type === 'teacher') {
			return true;
		} else if (user === null) {
			this.router.navigate(['/']);
			return false;
		}
	}

}