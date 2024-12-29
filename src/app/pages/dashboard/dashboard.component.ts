import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../ui-components/navbar/navbar.component';
import { CognitoService } from '../../auth/cognito.service';
@Component({
	selector: 'app-dashboard',
	imports: [NavbarComponent],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
	constructor(private cognitoService: CognitoService) {}

	ngOnInit() {}

	getUser() {
		console.log(this.cognitoService.userGroups.getValue());
	}
}
