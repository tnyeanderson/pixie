import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TextExpanderComponent } from './text-expander.component';



@NgModule({
  declarations: [
    TextExpanderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextExpanderComponent,
  ]
})
export class TextExpanderModule { }
