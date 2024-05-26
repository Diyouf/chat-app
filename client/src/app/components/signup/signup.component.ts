import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private _service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  signupForm!: FormGroup;
  confirmPassNotMatch: boolean = false;
  mySubscription: Subscription = new Subscription()

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)]],
      confirmpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.confirmpassword) {
        this.confirmPassNotMatch = true
        setTimeout(() => {
          this.confirmPassNotMatch = false;
        }, 3000)
      }

      this.mySubscription = this._service.userSignUp(this.signupForm.value).subscribe((res: any) => {
        if (res.success && res.token) {
          this.toastr.success('User created successfully!', 'Congratulations');
          localStorage.setItem('usertoken', res.token)
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.warning(res.message, 'Signup Failed');
        }
      }, (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message || 'Signup failed', 'Error');
      });


    } else {
      // Mark all fields as touched to display error messages
      this.signupForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
