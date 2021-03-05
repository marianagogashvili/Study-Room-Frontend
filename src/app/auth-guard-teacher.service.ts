import { Router, RouterStateSnapshot, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthGuardTeacher implements CanActivate, CanActivateChild {

	constructor(private router: Router,
				private authService: AuthService) {}

	canActivate(route: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): Observable<boolean> |
											Promise<boolean> |
											boolean {
		// const user = localStorage.getItem('userId');
		const token = localStorage.getItem('token');
		const decoded: { type } = jwt_decode(token);

		if (decoded.type === 'teacher') {
			return true;
		// } else if (user === null) {
		} else {
			this.router.navigate(['/']);
			return false;
		}
	}
	canActivateChild(route: ActivatedRouteSnapshot,
			    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
		return this.canActivate(route, state);
	}
}