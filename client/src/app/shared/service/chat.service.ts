import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  checkConnection(userIds: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/chat/checkConnection`, userIds);
  }

  getAllconnections(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/chat/getAllConnections/${id}`)
  }
}
