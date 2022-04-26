import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormifyModule } from './formify/formify.module';
import { AddDeviceComponent } from './forms/add-device/add-device.component';
import { AddImageComponent } from './forms/add-image/add-image.component';
import { AddScriptComponent } from './forms/add-script/add-script.component';
import { EditDeviceComponent } from './forms/edit-device/edit-device.component';
import { EditImageComponent } from './forms/edit-image/edit-image.component';
import { EditScriptComponent } from './forms/edit-script/edit-script.component';
import { DevicesListComponent } from './lists/devices-list/devices-list.component';
import { ImagesListComponent } from './lists/images-list/images-list.component';
import { LogsListComponent } from './lists/logs-list/logs-list.component';
import { ScriptsListComponent } from './lists/scripts-list/scripts-list.component';
import { NavModule } from './nav/nav.module';
import { ApiService } from './services/api.service';
import { ConfirmService } from './services/confirm/confirm.service';
import { ConfirmationDialogComponent } from './services/confirm/confirmation-dialog/confirmation-dialog.component';
import { TablifyModule } from './tablify/tablify.module';
import { ReloadButtonModule } from './fragments/reload-button/reload-button.module';
import { CloudConfigsListComponent } from './lists/cloud-configs-list/cloud-configs-list.component';
import { AddCloudConfigComponent } from './forms/add-cloud-config/add-cloud-config.component';
import { EditCloudConfigComponent } from './forms/edit-cloud-config/edit-cloud-config.component';


@NgModule({
  declarations: [
    AppComponent,
    ImagesListComponent,
    ScriptsListComponent,
    DevicesListComponent,
    AddImageComponent,
    AddScriptComponent,
    EditScriptComponent,
    ConfirmationDialogComponent,
    AddDeviceComponent,
    EditDeviceComponent,
    LogsListComponent,
    EditImageComponent,
    CloudConfigsListComponent,
    AddCloudConfigComponent,
    EditCloudConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    FormifyModule,
    TablifyModule,
    NavModule,
    ReloadButtonModule,
  ],
  providers: [
    ApiService,
    ConfirmService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
