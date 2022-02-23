import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { ScriptsListComponent } from './scripts-list/scripts-list.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: 'table', component: TableComponent},
  {path: 'devices', component: DevicesListComponent},
  {path: 'scripts', component: ScriptsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
