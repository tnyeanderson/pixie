import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesListComponent } from './lists/devices-list/devices-list.component';
import { ScriptsListComponent } from './lists/scripts-list/scripts-list.component';

const routes: Routes = [
  {path: 'devices', component: DevicesListComponent},
  {path: 'scripts', component: ScriptsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
