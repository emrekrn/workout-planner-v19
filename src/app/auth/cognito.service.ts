import { Injectable } from '@angular/core';
import {
	signIn,
	signOut,
	getCurrentUser,
	signUp,
	confirmSignUp,
} from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CognitoService {
	isUserSignedIn = new BehaviorSubject<boolean>(false);
	userGroups = new BehaviorSubject<string[]>([]);

	constructor() {
		Amplify.configure({
			Auth: {
				Cognito: environment.cognito,
			},
		});

		// When app start, check user is already signed in or not. Token is maybe valid
		this.getIsUserSignedIn()
			.then((isSignedIn) => {
				this.isUserSignedIn.next(isSignedIn);
				this.getUserGroups();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	getCurrentUser() {
		return getCurrentUser();
	}

	// groups array includes all groups of user
	getUserGroups() {
		cognitoUserPoolsTokenProvider
			.getTokens()
			.then((tokens) => {
				const groups = tokens?.accessToken.payload[
					'cognito:groups'
				] as string[];
				this.userGroups.next(groups);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async getIsUserSignedIn(): Promise<boolean> {
		try {
			await this.getCurrentUser();
		} catch (err) {
			return false;
		}
		return true;
	}

	signIn(username: string, password: string) {
		signIn({
			username: username,
			password: password,
		}).then(() => {
			this.isUserSignedIn.next(true);
			this.getUserGroups();
		});
	}

	signOut() {
		signOut().then(() => {
			this.isUserSignedIn.next(false);
		});
	}

	signUp(firstName: string, lastName: string, email: string, password: string) {
		return signUp({
			username: email,
			password: password,
			options: {
				userAttributes: {
					email: email,
					name: firstName,
					family_name: lastName,
				},
			},
		});
	}
	confirmSignUp(username: string, confirmationCode: string) {
		return confirmSignUp({
			username: username,
			confirmationCode: confirmationCode,
		});
	}
}
