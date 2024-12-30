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
	selector: 'app-login-form',
	imports: [Button, FloatLabel, FormsModule, InputText, ReactiveFormsModule],
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
	loginForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private cognitoService: CognitoService,
		private router: Router
	) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	onSubmit() {
		const email: string = this.loginForm.controls['email'].value;
		const password: string = this.loginForm.controls['password'].value;
		this.cognitoService.signIn(email, password);
	}
}
