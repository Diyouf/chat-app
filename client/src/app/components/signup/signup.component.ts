import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(private formBuilder: FormBuilder, private _service: AuthService) { }
  loginForm!: FormGroup;
  confirmPassNotMatch: boolean = false;
  mySubscription : Subscription = new Subscription()

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)]],
      confirmpassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.value.password !== this.loginForm.value.confirmpassword) {
        this.confirmPassNotMatch = true
        setTimeout(() => {
          this.confirmPassNotMatch = false;
        }, 3000)
      }

      this.mySubscription = this._service.userSignUp(this.loginForm.value).subscribe((res) => {
        console.log(res)
      })

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
