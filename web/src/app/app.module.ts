import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDeviceComponent } from './forms/add-device/add-device.component';
import { AddImageComponent } from './forms/add-image/add-image.component';
import { AddScriptComponent } from './forms/add-script/add-script.component';
import { EditDeviceComponent } from './forms/edit-device/edit-device.component';
import { EditImageComponent } from './forms/edit-image/edit-image.component';
import { EditScriptComponent } from './forms/edit-script/edit-script.component';
import { FormifyModule } from './forms/formify/formify.module';
import { TextExpanderComponent } from './fragments/text-expander/text-expander.component';
import { DevicesListComponent } from './lists/devices-list/devices-list.component';
import { ImagesListComponent } from './lists/images-list/images-list.component';
import { LogsListComponent } from './lists/logs-list/logs-list.component';
import { ScriptsListComponent } from './lists/scripts-list/scripts-list.component';
import { TableComponent } from './lists/tablify/table/table.component';
import { TablifyModule } from './lists/tablify/tablify.module';
import { NavComponent } from './nav/nav.component';
import { NavModule } from './nav/nav.module';
import { ApiService } from './services/api.service';
import { ConfirmService } from './services/confirm/confirm.service';
import { ConfirmationDialogComponent } from './services/confirm/confirmation-dialog/confirmation-dialog.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    FormifyModule,
    TablifyModule,
    NavModule,
  ],
  providers: [
    ApiService,
    ConfirmService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
