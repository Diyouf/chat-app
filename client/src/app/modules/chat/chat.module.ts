import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { MessageListComponent } from 'src/app/components/message-list/message-list.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { MessageInputComponent } from 'src/app/components/message-input/message-input.component';
import { MatmoduleModule } from 'src/app/shared/modules/matmodule.module';



@NgModule({
  declarations: [
    MessageListComponent,
    ChatComponent,
    MessageInputComponent,
    

  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatmoduleModule
  ],
  
})
export class ChatModule { }
