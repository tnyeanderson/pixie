import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootConfigsListComponent } from './lists/boot-configs-list/boot-configs-list.component';
import { DevicesListComponent } from './lists/devices-list/devices-list.component';
import { FilesListComponent } from './lists/files-list/files-list.component';
import { LogsListComponent } from './lists/logs-list/logs-list.component';

const routes: Routes = [
  {path: 'devices', component: DevicesListComponent},
  {path: 'boot-configs', component: BootConfigsListComponent},
  {path: 'files', component: FilesListComponent},
  {path: 'logs', component: LogsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
