import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CognitoService } from './cognito.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private cognitoService: CognitoService,
		private router: Router
	) {}

	async canActivate(): Promise<boolean> {
		try {
			const isLoggedIn = await this.cognitoService.isUserSignedIn();
			if (isLoggedIn) {
				return true;
			}
		} catch (error) {
			console.error('AuthGuard error:', error);
		}
		this.router.navigate(['/login']);
		return false;
	}
}
