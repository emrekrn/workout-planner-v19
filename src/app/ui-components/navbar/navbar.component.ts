import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { CognitoService } from '../../auth/cognito.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	imports: [NgClass],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
	showMobileMenu = signal(false);
	showUserMenu = signal(false);

	constructor(
		private cognitoService: CognitoService,
		private router: Router
	) {}

	toggleMobileMenu() {
		this.showMobileMenu.update((state) => !state);
	}

	toggleUserMenu() {
		this.showUserMenu.update((state) => !state);
	}

	handleSignOut() {
		this.cognitoService.signOut().then((r) => this.router.navigate(['/login']));
	}
}
