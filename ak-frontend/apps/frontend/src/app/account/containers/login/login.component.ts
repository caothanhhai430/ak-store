import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginReqBody } from '@akfe/account/models/account';
import { AccountService } from '@akfe/account/services/account.service';

@Component({
  selector: 'ak-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      rememberMe: [true]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formValue = this.validateForm.value;
      const body: LoginReqBody = {
        username: formValue.username,
        password: formValue.password,
        rememberMe: formValue.rememberMe
      };
      this.accountService.login(body).subscribe({
        next: value => {
          console.log(value);
        },
        error: err => {
          console.log(err);
        }
      });
    } else {
      this.validateForm.markAllAsTouched();
      Object.entries(this.validateForm.controls).forEach(([key, control]) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }
}
