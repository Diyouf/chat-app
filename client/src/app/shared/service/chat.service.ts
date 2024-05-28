import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Message } from 'src/app/models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl;
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient, private socket: Socket) { }

  checkConnection(userIds: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/chat/checkConnection`, userIds);
  }

  getAllconnections(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/chat/getAllConnections/${id}`);
  }

  setData(data: { id: string }) {
    this.dataSubject.next(data);
  }

  getData(): { id: string } {
    return this.dataSubject.value;
  }

  sendMessage(message: Message): void {
    this.socket.emit('sendMessage', message);
  }

  getNewMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('newMessage');
  }

  loadAllMessages(id: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/api/chat/getAllMessages/${id}`);
  }
}
