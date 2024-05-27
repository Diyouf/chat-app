import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Set the change detection strategy
})
export class UserlistComponent {
  @Input() userList!: [User];
}
