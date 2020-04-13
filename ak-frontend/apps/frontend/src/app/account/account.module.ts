import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './constants/routes';
import {
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzInputModule
} from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivateComponent } from './containers/activate/activate.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ActivateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule
  ]
})
export class AccountModule {}
