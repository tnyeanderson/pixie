import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table/table.component';
import { TextExpanderComponent } from 'src/app/fragments/text-expander/text-expander.component';
import { MatIconModule } from '@angular/material/icon';
import { TextExpanderModule } from 'src/app/fragments/text-expander/text-expander.module';



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
    MatIconModule,
    TextExpanderModule
  ],
  exports: [
    TableComponent,
  ]
})
export class TablifyModule { }
