import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private _service: AuthService, private toastr: ToastrService, private router: Router) { }

  loginForm!: FormGroup;

  mySubscription: Subscription = new Subscription()

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.mySubscription = this._service.userlogin(this.loginForm.value).subscribe((res) => {
        if (res.success && res.token) {
          this.toastr.success('User created successfully!', 'Congratulations');
          localStorage.setItem('usertoken', res?.token)
          this.router.navigate(['/dashboard']);
        }else{
          this.toastr.warning(res.message, 'Login failed');
        }
      },(error: HttpErrorResponse) => {
        this.toastr.error(error.error.message || 'Login failed', 'Error');
      }
    )
    } else {
      // Mark all fields as touched to display error messages
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
