import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Connection } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/shared/service/chat.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {
  connectionId!: string | null;
  userId!: { id: string, token: string } | null;
  allConnection: Connection[] = [];
  mySubscription : Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private _service: ChatService, private userService: UserService) { }
  

  ngOnInit(): void {
    this.getAllconnections();
    this.connectionId = this.route.snapshot.paramMap.get('id');
    console.log('Connection ID:', this.connectionId);
  }

  getAllconnections() {
    this.userId = this.userService.getUserToken();
    if (this.userId) {
      this.mySubscription = this._service.getAllconnections(this.userId?.id).subscribe((data: Connection[]) => {
        this.allConnection = data.map(connection => ({
          ...connection,
          participants: connection.participants.filter(participant => participant._id !== this.userId?.id)
        }));
      });
    }
  }

  trackById(index: number, connection: any): string {
    return connection._id; // Assuming _id is the unique identifier for each connection
  }

  ngOnDestroy(): void {
    if(this.mySubscription){
      this.mySubscription.unsubscribe();
    }
  }



}
