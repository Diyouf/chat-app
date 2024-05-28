import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../shared/service/user.service';
import { ChatService } from '../../shared/service/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../create-group/create-group.component';

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
    private userService: UserService,
    private dialog:MatDialog
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

  onClick(){
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '500px',
      data: { name: 'Angular', animal: 'Dog' },
    });
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }
}
