import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BaseFormComponent } from './formify-components/base-form/base-form.component';
import { FormButtonsComponent } from './formify-components/form-buttons/form-buttons.component';
import { FormInputCheckboxComponent } from './formify-components/form-input-checkbox/form-input-checkbox.component';
import { FormInputCodeComponent } from './formify-components/form-input-code/form-input-code.component';
import { FormInputDropdownComponent } from './formify-components/form-input-dropdown/form-input-dropdown.component';
import { FormInputFileComponent } from './formify-components/form-input-file/form-input-file.component';
import { FormInputTextComponent } from './formify-components/form-input-text/form-input-text.component';
import { FormInputUploadInlineComponent } from './formify-components/form-input-upload-inline/form-input-upload-inline.component';
import { UploadInline } from './formify-components/form-input-upload-inline/upload-inline';



@NgModule({
  declarations: [
    BaseFormComponent,
    FormButtonsComponent,
    FormInputCheckboxComponent,
    FormInputTextComponent,
    FormInputFileComponent,
    FormInputDropdownComponent,
    FormInputCodeComponent,
    FormInputUploadInlineComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    NgxDropzoneModule,
  ],
  exports: [
    BaseFormComponent,
    FormButtonsComponent,
    FormInputCheckboxComponent,
    FormInputTextComponent,
    FormInputFileComponent,
    FormInputDropdownComponent,
    FormInputCodeComponent,
    FormInputUploadInlineComponent,
  ],
})
export class FormifyModule { }
