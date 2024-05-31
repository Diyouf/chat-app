import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { MatmoduleModule } from 'src/app/shared/modules/matmodule.module';
import { UserlistComponent } from 'src/app/components/userlist/userlist.component';
import { CreateGroupComponent } from 'src/app/components/create-group/create-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    UserlistComponent  ,
    CreateGroupComponent
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatmoduleModule,
    FormsModule,
    ReactiveFormsModule
  ],
 
})
export class DashboardModule { }
