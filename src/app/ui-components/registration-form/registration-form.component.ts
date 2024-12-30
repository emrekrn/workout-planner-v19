import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { CognitoService } from '../../auth/cognito.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registration-form',
	imports: [Button, FloatLabel, FormsModule, InputText, ReactiveFormsModule],
	templateUrl: './registration-form.component.html',
	styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
	registrationForm: FormGroup;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private cognitoService: CognitoService
	) {
		this.registrationForm = this.formBuilder.group({
			firstName: [''],
			lastName: [''],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	onSubmit() {
		const firstName: string = this.registrationForm.controls['firstName'].value;
		const lastName: string = this.registrationForm.controls['lastName'].value;
		const email: string = this.registrationForm.controls['email'].value;
		const password: string = this.registrationForm.controls['password'].value;

		this.cognitoService
			.signUp(firstName, lastName, email, password)
			.then((res) => {
				this.router.navigate(['/confirm-registration', email]);
			});
	}
}
