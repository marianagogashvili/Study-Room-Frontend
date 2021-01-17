import { Router, RouterStateSnapshot, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private router: Router,
				private authService: AuthService) {}

	canActivate(route: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): Observable<boolean> |
											Promise<boolean> |
											boolean {
		const user = localStorage.getItem('userId');
		const token = localStorage.getItem('token');

		if (user && token) {
			return true;
		} else if (user === null) {
			this.router.navigate(['/']);
			return false;
		}
	}
	canActivateChild(route: ActivatedRouteSnapshot,
			    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
		return this.canActivate(route, state);
	}
}