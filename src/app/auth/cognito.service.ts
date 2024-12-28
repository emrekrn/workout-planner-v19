import { Injectable } from '@angular/core';
import {
	signIn,
	signOut,
	getCurrentUser,
	fetchAuthSession,
} from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CognitoService {
	constructor() {
		Amplify.configure({
			Auth: {
				Cognito: environment.cognito,
			},
		});
	}

	async isUserSignedIn(): Promise<boolean> {
		try {
			await getCurrentUser();
		} catch (err) {
			return false;
		}
		return true;
	}

	async signIn(username: string, password: string) {
		await signIn({
			username: username,
			password: password,
		});
	}

	async signOut() {
		return await signOut();
	}
}
