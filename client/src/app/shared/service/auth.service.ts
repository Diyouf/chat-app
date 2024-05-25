import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  private apiUrl = environment.apiUrl

  userlogin(data:any):Observable<any>{
      return this.http.post(`${this.apiUrl}/api/auth/login`,data)
  }

  userSignUp(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/api/auth/signup`,data)
  }
}
