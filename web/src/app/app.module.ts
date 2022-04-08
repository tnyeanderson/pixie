import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevicesListComponent } from './lists/devices-list/devices-list.component';
import { AddScriptComponent } from './forms/add-script/add-script.component';
import { BaseFormComponent } from './forms/form-components/base-form/base-form.component';
import { EditScriptComponent } from './forms/edit-script/edit-script.component';
import { NavComponent } from './nav/nav.component';
import { ScriptsListComponent } from './lists/scripts-list/scripts-list.component';
import { ApiService } from './services/api.service';
import { ConfirmService } from './services/confirm/confirm.service';
import { ConfirmationDialogComponent } from './services/confirm/confirmation-dialog/confirmation-dialog.component';
import { TableComponent } from './lists/table/table.component';
import { AddDeviceComponent } from './forms/add-device/add-device.component';
import { MatSelectModule } from '@angular/material/select';
import { EditDeviceComponent } from './forms/edit-device/edit-device.component';
import { ImagesListComponent } from './lists/images-list/images-list.component';
import { AddImageComponent } from './forms/add-image/add-image.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormInputTextComponent } from './forms/form-components/form-input-text/form-input-text.component';
import { FormInputCheckboxComponent } from './forms/form-components/form-input-checkbox/form-input-checkbox.component';
import { FormButtonsComponent } from './forms/form-components/form-buttons/form-buttons.component';
import { FormInputFileComponent } from './forms/form-components/form-input-file/form-input-file.component';
import { FormInputDropdownComponent } from './forms/form-components/form-input-dropdown/form-input-dropdown.component';
import { FormInputCodeComponent } from './forms/form-components/form-input-code/form-input-code.component';


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
    NgxDropzoneModule,
  ],
  providers: [
    ApiService,
    ConfirmService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
