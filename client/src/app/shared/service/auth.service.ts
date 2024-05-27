import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development'
import { Observable } from 'rxjs';
import { AuthResponse, LoginRequestBody, SignupRequestBody } from 'src/app/models/auth.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  private apiUrl = environment.apiUrl

  userlogin(data:LoginRequestBody):Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/login`,data)
  }

  userSignUp(data:SignupRequestBody):Observable<AuthResponse>{
    console.log(data)
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/signup`,data)
  }


}
