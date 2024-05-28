import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatmoduleModule } from './shared/modules/matmodule.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment.development';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const apiUrl = environment.apiUrl
const config: SocketIoConfig = { url: apiUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatmoduleModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    ),
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
