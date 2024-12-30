import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginFormComponent } from './ui-components/login-form/login-form.component';
import { RegistrationFormComponent } from './ui-components/registration-form/registration-form.component';
import { ConfirmRegistrationComponent } from './ui-components/confirm-registration/confirm-registration.component';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { HistoryComponent } from './pages/history/history.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'workouts',
		component: WorkoutsComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'history',
		component: HistoryComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'settings',
		component: SettingsComponent,
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
