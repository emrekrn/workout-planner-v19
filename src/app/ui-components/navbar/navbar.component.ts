import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-navbar',
	imports: [NgClass],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
	showMobileMenu = signal(false);
	showUserMenu = signal(false);

	toggleMobileMenu() {
		this.showMobileMenu.update((state) => !state);
	}

	toggleUserMenu() {
		this.showUserMenu.update((state) => !state);
	}
}
