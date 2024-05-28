import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    
  ],
  imports: [
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatDialogModule
    
  ],
  exports:[
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
    
  ]
})
export class MatmoduleModule { }
