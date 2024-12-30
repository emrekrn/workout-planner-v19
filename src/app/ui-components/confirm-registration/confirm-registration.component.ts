import { Component, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import {
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router';
import { CognitoService } from '../../auth/cognito.service';

@Component({
	selector: 'app-confirm-registration',
	imports: [Button, FloatLabel, FormsModule, InputText, ReactiveFormsModule],
	templateUrl: './confirm-registration.component.html',
	styleUrl: './confirm-registration.component.scss',
})
export class ConfirmRegistrationComponent implements OnInit {
	username = signal('');
	registrationCode = new FormControl('', {
		validators: [Validators.required],
		nonNullable: true,
	});

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private cognitoService: CognitoService
	) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			console.log(params);
			this.username.set(params['email']);
		});
	}

	onSubmit() {
		this.cognitoService
			.confirmSignUp(this.username(), this.registrationCode.value)
			.then((res) => {
				this.router.navigate(['/']);
			});
	}
}
