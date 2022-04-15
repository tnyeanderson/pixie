import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ScriptItem, UploadInline } from 'src/types';

@Component({
  selector: 'app-edit-script',
  templateUrl: './edit-script.component.html',
  styleUrls: ['./edit-script.component.scss']
})
export class EditScriptComponent implements OnInit {
  model: ScriptItem
  scriptFile = new UploadInline()

  constructor(
    public dialogRef: MatDialogRef<EditScriptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScriptItem,
    private apiService: ApiService
  ) {
    this.model = Object.assign(new ScriptItem(), data)
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

  uploadFileOrText() {
    if (this.scriptFile.isUpload() && this.scriptFile.hasContent()) {
      return this.apiService.uploadScript(this.model.Path, this.scriptFile.getFile())
    } else if (this.scriptFile.isInline() && this.scriptFile.hasContent()) {
      return this.apiService.uploadScriptText(this.model.Path, this.scriptFile.getInline())
    }

    return of({ status: 'skipped file contents update' })
  }

  delete = () => {
    if (this.model.ID) {
      this.apiService.deleteScript(this.model.ID).subscribe()
    }
  }

  ngOnInit(): void {
    this.scriptFile.format = this.scriptFile.formats.inline
    this.apiService.getFileContent(`scripts/${this.model.Path}`).subscribe((r: Blob) => {
      r.text().then(text => {
        this.scriptFile.setInlineContent(text)
      })
    })
  }

}
