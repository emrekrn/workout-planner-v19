import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CognitoService } from './cognito.service';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private cognitoService: CognitoService,
		private router: Router
	) {}

	async canActivate(): Promise<boolean> {
		const isUserSignedIn = await firstValueFrom(
			this.cognitoService.isUserSignedIn
		);
		if (isUserSignedIn) {
			return true;
		} else {
			this.router.navigate(['/']);
			return false;
		}
	}
}
