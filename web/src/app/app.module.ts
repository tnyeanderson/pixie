import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
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
import { EditScriptComponent } from './forms/edit-script/edit-script.component';
import { BaseFormComponent } from './forms/form-components/base-form/base-form.component';
import { FormButtonsComponent } from './forms/form-components/form-buttons/form-buttons.component';
import { FormInputCheckboxComponent } from './forms/form-components/form-input-checkbox/form-input-checkbox.component';
import { FormInputCodeComponent } from './forms/form-components/form-input-code/form-input-code.component';
import { FormInputDropdownComponent } from './forms/form-components/form-input-dropdown/form-input-dropdown.component';
import { FormInputFileComponent } from './forms/form-components/form-input-file/form-input-file.component';
import { FormInputTextComponent } from './forms/form-components/form-input-text/form-input-text.component';
import { FormInputUploadInlineComponent } from './forms/form-components/form-input-upload-inline/form-input-upload-inline.component';
import { DevicesListComponent } from './lists/devices-list/devices-list.component';
import { ImagesListComponent } from './lists/images-list/images-list.component';
import { ScriptsListComponent } from './lists/scripts-list/scripts-list.component';
import { TableComponent } from './lists/table/table.component';
import { NavComponent } from './nav/nav.component';
import { ApiService } from './services/api.service';
import { ConfirmService } from './services/confirm/confirm.service';
import { ConfirmationDialogComponent } from './services/confirm/confirmation-dialog/confirmation-dialog.component';
import { LogsListComponent } from './lists/logs-list/logs-list.component';
import { TextExpanderComponent } from './fragments/text-expander/text-expander.component';
import { EditImageComponent } from './forms/edit-image/edit-image.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatsCounterComponent } from './fragments/stats-counter/stats-counter.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TableComponent,
    ImagesListComponent,
    ScriptsListComponent,
    DevicesListComponent,
    AddImageComponent,
    AddScriptComponent,
    EditScriptComponent,
    BaseFormComponent,
    ConfirmationDialogComponent,
    AddDeviceComponent,
    EditDeviceComponent,
    FormInputTextComponent,
    FormInputCheckboxComponent,
    FormButtonsComponent,
    FormInputFileComponent,
    FormInputDropdownComponent,
    FormInputCodeComponent,
    FormInputUploadInlineComponent,
    LogsListComponent,
    TextExpanderComponent,
    EditImageComponent,
    DashboardComponent,
    StatsCounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTabsModule,
    NgxDropzoneModule,
  ],
  providers: [
    ApiService,
    ConfirmService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
