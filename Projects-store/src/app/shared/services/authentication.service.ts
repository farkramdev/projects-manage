import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionFactory } from '../factories/session.factory';
import { Url } from '../factories/url.factory';

// activate for authenticated
@Injectable()
export class RequireAuth implements CanActivate {
	constructor(private router: Router) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (SessionFactory.getAuthentication) {
			return true;
		}
		this.router.navigate(['/', Url.Signin, { referer: state.url }]);
		return false;
	}
}

// activate for un authentication
@Injectable()
export class RequireSignin {
	constructor(private router: Router) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (!SessionFactory.getAuthentication) {
			return true;
		}
		this.router.navigate([Url.Home]);
		return false;
	}
}