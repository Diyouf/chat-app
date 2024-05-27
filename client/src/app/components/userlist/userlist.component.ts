import { Component, Input, ChangeDetectionStrategy, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserlistComponent  {
  displayedColumns: string[] = ['position', 'name', 'email', 'joinedDate','action'];
  @Input() userList: User[] = [];
  @Output() chatClicked: EventEmitter<string> = new EventEmitter<string>();

  openChat(id:string){  
    this.chatClicked.emit(id);
  }

}
