import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloudConfigsListComponent } from './lists/cloud-configs-list/cloud-configs-list.component';
import { DevicesListComponent } from './lists/devices-list/devices-list.component';
import { ImagesListComponent } from './lists/images-list/images-list.component';
import { LogsListComponent } from './lists/logs-list/logs-list.component';
import { ScriptsListComponent } from './lists/scripts-list/scripts-list.component';

const routes: Routes = [
  {path: 'devices', component: DevicesListComponent},
  {path: 'cloudconfigs', component: CloudConfigsListComponent},
  {path: 'images', component: ImagesListComponent},
  {path: 'scripts', component: ScriptsListComponent},
  {path: 'logs', component: LogsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
