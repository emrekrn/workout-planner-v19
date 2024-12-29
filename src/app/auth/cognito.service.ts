import { Injectable } from '@angular/core';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CognitoService {
	userGroups: string[] = [];
	constructor() {
		Amplify.configure({
			Auth: {
				Cognito: environment.cognito,
			},
		});

		this.getUsersGroups();
	}

	getCurrentUser() {
		return getCurrentUser();
	}

	// groups array includes all groups of user
	getUsersGroups() {
		cognitoUserPoolsTokenProvider
			.getTokens()
			.then((tokens) => {
				(tokens?.accessToken.payload['cognito:groups'] as string[]).map(
					(group) => this.userGroups.push(group)
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async isUserSignedIn(): Promise<boolean> {
		try {
			await this.getCurrentUser();
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
