import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormifyModule } from 'src/app/forms/formify/formify.module';
import { TextExpanderModule } from 'src/app/fragments/text-expander/text-expander.module';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    TextExpanderModule,
  ],
  exports: [
    TableComponent,
  ]
})
export class TablifyModule { }
