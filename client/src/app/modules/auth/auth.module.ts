import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing.module';
import { MatmoduleModule } from 'src/app/shared/modules/matmodule.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/components/login/login.component';
import { CommonModule } from '@angular/common';
import { SignupComponent } from 'src/app/components/signup/signup.component';

@NgModule({
    imports: [
        AuthRoutingModule,
        ReactiveFormsModule,   
        MatmoduleModule,
        CommonModule,

    ],
    exports: [],
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    providers: [],
})
export class AuthModule { }
