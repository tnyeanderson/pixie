import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReloadButtonComponent } from './reload-button.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ReloadButtonComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    ReloadButtonComponent,
  ]
})
export class ReloadButtonModule { }
