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
  signupForm!: FormGroup;
  confirmPassNotMatch = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)]],
      confirmpassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    console.log(this.signupForm.valid,this.signupForm.value.password === this.signupForm.value.confirmpassword)
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmpassword) {
      this.subscription = this.authService.userSignUp(this.signupForm.value).subscribe(
        (res: any) => {
          if (res.status) {
            this.toastr.success('User created successfully!', 'Congratulations');
            localStorage.setItem('usertoken', res.token);
            this.router.navigate(['/chat/app']);
          } else {
            this.toastr.warning(res.message || 'Signup failed', 'Signup Failed');
          }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message || 'Signup failed', 'Error');
        }
      );
    } else {
      this.confirmPassNotMatch = true;
      setTimeout(() => {
        this.confirmPassNotMatch = false;
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
