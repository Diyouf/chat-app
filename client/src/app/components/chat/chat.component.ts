import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Connection, Message } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/shared/service/chat.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  connectionId: string | null = null;
  userId: { id: string, token: string } | null = null;
  allConnection: Connection[] = [];
  mySubscription = new Subscription();
  receivedData: { id: string } | null = null;
  emitSubscription = new Subscription();
  selectedConnectionId: string | null = null;
  allChats: Message[] = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserToken();
    if (this.userId) {
      this.getAllConnections();
      this.subscribeToData();
    }
  }

  getAllConnections(): void {
    this.mySubscription.add(
      this.chatService.getAllconnections(this.userId!.id).subscribe({
        next: (data: Connection[]) => {
          this.allConnection = data.map(connection => ({
            ...connection,
            participants: connection.participants.filter(participant => participant._id !== this.userId!.id)
          }));
          this.handleReceivedData();
        },
        error: err => console.error('Error loading connections:', err)
      })
    );
  }

  subscribeToData(): void {
    this.emitSubscription.add(
      this.chatService.data$.subscribe({
        next: data => {
          this.receivedData = data;
          this.handleReceivedData();
        },
        error: err => console.error('Error receiving data:', err)
      })
    );
  }

  handleReceivedData(): void {
    if (this.receivedData && this.receivedData.id && this.allConnection.length > 0) {
      const matchingConnection = this.allConnection.find(connection => connection._id === this.receivedData?.id);
      if (matchingConnection) {
        this.selectConnection(this.receivedData.id);
      } else {
        console.log('No matching connection found.');
      }
    }
  }

  selectConnection(connectionId: string): void {
    this.selectedConnectionId = connectionId;
    this.loadAllMessages(this.selectedConnectionId);
  }

  sendMessage(message: string): void {
    if (!this.selectedConnectionId || !this.userId) {
      console.error('No connection selected or user not authenticated.');
      return;
    }

    const selectedConnection = this.allConnection.find(connection => connection._id === this.selectedConnectionId);
    if (!selectedConnection) {
      console.error('Selected connection not found.');
      return;
    }

    const recipientId = selectedConnection.participants[0]._id;
    const messageData: Message = {
      from: this.userId.id,
      content: message,
      connectionId: this.selectedConnectionId,
      to: recipientId
    };
    this.chatService.sendMessage(messageData);
    this.chatService.getNewMessage().subscribe({
      next: (_) => {
        if (this.selectedConnectionId) {
          this.loadAllMessages(this.selectedConnectionId);
        }
      },
      error: err => console.error('Error getting new message:', err)
    });
  }

  loadAllMessages(id: string): void {
    this.chatService.loadAllMessages(id).subscribe({
      next: (data: Message[]) => {
        this.allChats = data;
      },
      error: err => console.error('Error loading messages:', err)
    });
  }

  trackById(index: number, connection: Connection): string {
    return connection._id;
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
    this.emitSubscription.unsubscribe();
  }
}
