import { Component } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@Component({
	selector: 'app-login-page',
	imports: [FloatLabel, InputText, Button, ReactiveFormsModule],
	templateUrl: './login-page.component.html',
	styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
	loginForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	onSubmit() {
		console.log(this.loginForm.value);
	}
}
