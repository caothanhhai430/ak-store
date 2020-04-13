import { Routes } from '@angular/router';
import { LoginComponent } from '../containers/login/login.component';
import { RegisterComponent } from '../containers/register/register.component';
import { ActivateComponent } from '../containers/activate/activate.component';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'activate',
        component: ActivateComponent
      }
    ]
  }
];
