import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private _service: AuthService) { }

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
