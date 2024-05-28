import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from 'src/app/components/chat/chat.component';

const routes: Routes = [
  { path: 'app', component: ChatComponent } // Assuming you want to pass the connection ID as a route parameter
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
