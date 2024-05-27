import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import * as jwtDecode from 'jwt-decode';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = environment.apiUrl; // Replace this with your API endpoint
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  userId!: { id: string, token: string } | null


  getAllusers(): Observable<User[]> {
    this.userId = this.getUserToken()
      return this.http.get<User[]>(`${this.api}/api/user/getAlluser/${this.userId?.id}`)
  }

  getToken(): string | null {
    return localStorage.getItem('usertoken');
  }

  getUserToken(): { id: string, token: string } | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode.jwtDecode(token) as { id: string, token: string };
    }
    return null;
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.api}/api/user/get/${id}`);
  }

  getUserData(id: string): void {
    this.getUser(id).subscribe(
      (userData: User) => {
        this.userSubject.next(userData);
      }
    );
  }

  getUserDataObserver(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
