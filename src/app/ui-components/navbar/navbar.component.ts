import { Component, signal } from '@angular/core';
import { CognitoService } from '../../auth/cognito.service';
import { RouterLink } from '@angular/router';
import { Tooltip } from 'primeng/tooltip';

@Component({
	selector: 'app-navbar',
	imports: [Tooltip, RouterLink],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
	constructor(private cognitoService: CognitoService) {}

	handleSignOut() {
		this.cognitoService.signOut();
	}
}
