import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../shared/service/user.service';
import { ChatService } from '../../shared/service/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mySubscription: Subscription = new Subscription();
  users: User[] = [];
  userId!: { id: string, token: string } | null;

  constructor(
    private _userService: UserService,
    private _apiService: ChatService,
    private _router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.mySubscription = this._userService.getAllusers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  handleChatClick(id: string): void {
    this.userId = this.userService.getUserToken();
    if (this.userId) {
      const userId = this.userId.id; // Ensure userId is a string
      this._apiService.checkConnection([id, userId]).subscribe((connection: any) => {
        if (connection) {
          console.log(connection)
          this._apiService.setData({ id: connection._id });
          this._router.navigate(['/chat/app']); // Assuming the connection object has an _id property
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
