import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CognitoService } from './auth/cognito.service';
import { AsyncPipe } from '@angular/common';
import { NavbarComponent } from './ui-components/navbar/navbar.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, AsyncPipe, NavbarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
	private subscription: Subscription | null = null;

	constructor(
		public cognitoService: CognitoService,
		private router: Router
	) {}

	ngOnInit(): void {
		// Subscribe to authentication state changes
		this.subscription = this.cognitoService.isUserSignedIn.subscribe(
			(isSignedIn) => {
				if (isSignedIn) {
					this.router.navigate(['/dashboard']); // Navigate after signing in
				} else {
					this.router.navigate(['/']);
				}
			}
		);
	}

	ngOnDestroy(): void {
		// Cleanup to avoid memory leaks
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
