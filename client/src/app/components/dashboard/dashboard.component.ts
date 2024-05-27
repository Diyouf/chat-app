import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();
  users: User[] = []
  constructor(private _service: UserService) { }

  ngOnInit(): void {
    this.mySubscription = this._service.getAllusers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

  handleChatClick(id: string): void {
    console.log('Chat clicked for user:', id);
  }


  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }


}
