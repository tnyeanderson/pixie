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
import { AddFileComponent } from './forms/add-file/add-file.component';
import { EditDeviceComponent } from './forms/edit-device/edit-device.component';
import { EditFileComponent } from './forms/edit-file/edit-file.component';
import { ReloadButtonModule } from './fragments/reload-button/reload-button.module';
import { DevicesListComponent } from './lists/devices-list/devices-list.component';
import { FilesListComponent } from './lists/files-list/files-list.component';
import { LogsListComponent } from './lists/logs-list/logs-list.component';
import { NavModule } from './nav/nav.module';
import { ApiService } from './services/api.service';
import { ConfirmService } from './services/confirm/confirm.service';
import { ConfirmationDialogComponent } from './services/confirm/confirmation-dialog/confirmation-dialog.component';
import { TablifyModule } from './tablify/tablify.module';


@NgModule({
  declarations: [
    AppComponent,
    FilesListComponent,
    DevicesListComponent,
    AddFileComponent,
    EditFileComponent,
    ConfirmationDialogComponent,
    AddDeviceComponent,
    EditDeviceComponent,
    LogsListComponent,
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
