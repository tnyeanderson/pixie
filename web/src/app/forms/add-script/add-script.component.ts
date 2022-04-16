import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ScriptItem } from 'src/types';
import { ApiService } from '../../services/api.service';
import { UploadInline } from '../../formify/formify-components/form-input-upload-inline/upload-inline';

@Component({
  selector: 'app-add-script',
  templateUrl: './add-script.component.html',
  styleUrls: ['./add-script.component.scss']
})
export class AddScriptComponent implements OnInit {
  model: ScriptItem = new ScriptItem()
  scriptFile: UploadInline = new UploadInline()

  constructor(public dialogRef: MatDialogRef<AddScriptComponent>, private apiService: ApiService) { }

  fileAdded = (event: any) => {
    const file: File = event.addedFiles[0]
    this.model.Name = this.model.Name || file.name
    this.model.Path = this.model.Path || file.name
  }

  validate = () => !!this.model.Name

  submit = () => {
    this.apiService.addScript(this.model).subscribe(r => {
      this.uploadFileOrText().subscribe(r => {
        this.dialogRef.close()
      })
    })
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
      this.uploaders.otherwise
    )
  }

  ngOnInit(): void {
  }

}
