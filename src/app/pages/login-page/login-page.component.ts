import { Component, OnInit } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { CognitoService } from '../../auth/cognito.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-page',
	imports: [FloatLabel, InputText, Button, ReactiveFormsModule],
	templateUrl: './login-page.component.html',
	styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
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
		this.cognitoService.signIn(email, password).then((r) => {
			this.router.navigate(['/dashboard']);
		});
	}

	async ngOnInit() {
		await this.cognitoService.isUserSignedIn().then((r) => {
			if (r) {
				this.router.navigate(['/dashboard']);
			}
		});
	}
}
