import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { MatmoduleModule } from 'src/app/shared/modules/matmodule.module';
import { UserlistComponent } from 'src/app/components/userlist/userlist.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserlistComponent   
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatmoduleModule
  ],
 
})
export class DashboardModule { }
