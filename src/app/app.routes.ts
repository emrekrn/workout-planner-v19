import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginFormComponent } from './ui-components/login-form/login-form.component';
import { RegistrationFormComponent } from './ui-components/registration-form/registration-form.component';
import { ConfirmRegistrationComponent } from './ui-components/confirm-registration/confirm-registration.component';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],
	},
	{
		path: '',
		component: LoginPageComponent,
		children: [
			{
				path: '',
				component: LoginFormComponent,
				pathMatch: 'full',
			},
			{
				path: 'register',
				component: RegistrationFormComponent,
			},
			{
				path: 'confirm-registration/:email',
				component: ConfirmRegistrationComponent,
			},
		],
	},
];
