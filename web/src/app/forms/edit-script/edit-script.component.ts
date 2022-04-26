import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UploadInlineService } from 'src/app/formify/formify-services/upload-inline.service';
import { ApiService } from 'src/app/services/api.service';
import { ScriptItem } from 'src/types';
import { UploadInline } from '../../formify/formify-components/form-input-upload-inline/upload-inline';

@Component({
  selector: 'app-edit-script',
  templateUrl: './edit-script.component.html',
  styleUrls: ['./edit-script.component.scss']
})
export class EditScriptComponent implements OnInit {
  model: ScriptItem = new ScriptItem()
  scriptFile: UploadInline

  constructor(
    public dialogRef: MatDialogRef<EditScriptComponent>,
    @Inject(MAT_DIALOG_DATA) public initialData: ScriptItem,
    private apiService: ApiService,
    private uploadInlineService: UploadInlineService
  ) {
    this.scriptFile = uploadInlineService.create()
  }

  validate = () => !!this.model.Name

  submit = () => {
    if (this.model.ID) {
      this.apiService.editScript(this.model.ID, this.model).subscribe(r => {
        this.uploadFileOrText().subscribe(r => {
          this.dialogRef.close()
        })
      })
    }
  }

  uploaders = {
    ifUpload: () => {
      return this.apiService.uploadScript(this.model.Path, this.scriptFile.getFile())
    },
    ifInline: () => {
      return this.apiService.uploadScriptText(this.model.Path, this.scriptFile.getInline())
    },
    otherwise: () => {
      return of({ status: 'skipped file contents update' })
    }
  }

  uploadFileOrText() {
    return this.scriptFile.do(
      this.uploaders.ifUpload,
      this.uploaders.ifInline,
      this.uploaders.otherwise,
    )
  }

  delete = () => {
    if (this.model.ID) {
      this.apiService.deleteScript(this.model.ID).subscribe(r => {
        this.dialogRef.close()
      })
    }
  }

  initializeContent() {
    this.apiService.getFileContent(`scripts/${this.initialData.Path}`)
      .subscribe(this.initializeContentFromBlob)
  }

  initializeContentFromBlob = (blob: Blob) => {
    return blob.text().then(text => this.scriptFile.setInlineContent(text))
  }

  ngOnInit(): void {
    this.scriptFile.setModeInline()
    this.initializeContent()
  }

}
