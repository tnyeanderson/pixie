import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddScriptComponent } from './forms/add-script/add-script.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { NavComponent } from './nav/nav.component';
import { ScriptsListComponent } from './scripts-list/scripts-list.component';
import { ApiService } from './services/api.service';
import { TableComponent } from './table/table.component';
import { MatChipsModule } from '@angular/material/chips';
import { EditScriptComponent } from './forms/edit-script/edit-script.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BaseFormComponent } from './forms/base-form/base-form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TableComponent,
    ScriptsListComponent,
    DevicesListComponent,
    AddScriptComponent,
    EditScriptComponent,
    BaseFormComponent,
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
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
