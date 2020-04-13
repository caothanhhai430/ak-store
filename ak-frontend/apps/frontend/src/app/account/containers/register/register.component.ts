import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@akfe/account/services/account.service';
import { RegisterReqBody } from '@akfe/account/models/account';

@Component({
  selector: 'ak-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formValue = this.validateForm.value;
      const body: RegisterReqBody = {
        email: formValue.email,
        login: formValue.username,
        password: formValue.password
      };
      this.accountService.register(body).subscribe({
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
