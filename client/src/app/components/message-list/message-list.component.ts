import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/chat.model';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnInit {

  constructor(private _service:UserService){}
  
  @Input() chatData!:Message[]
  userId!:string | undefined

  ngOnInit(): void {
    const user = this._service.getUserToken()
    this.userId = user?.id
  }

  trackById(index: number, messages: Message): string | undefined {
    return messages._id;
  }
  
}
