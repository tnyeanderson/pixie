import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ScriptItem, UploadInline } from 'src/types';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-script',
  templateUrl: './add-script.component.html',
  styleUrls: ['./add-script.component.scss']
})
export class AddScriptComponent implements OnInit {
  model: ScriptItem = new ScriptItem()
  scriptFile: UploadInline = new UploadInline()

  constructor(public dialogRef: MatDialogRef<AddScriptComponent>, private apiService: ApiService) { }

  onFileAdded = (event: any) => {
    const file: File = event.addedFiles[0]
    this.model.Name = this.model.Name || file.name
    this.model.Path = this.model.Path || file.name
  }

  validate = () => (this.model.Name)

  close = () => { }

  submit = () => {

    this.apiService.addScript(this.model).subscribe(r => {
      this.uploadFileOrText().subscribe(r => {
        this.dialogRef.close()
      })
    })
  }

  uploadFileOrText() {
    if (this.scriptFile.isUpload() && this.scriptFile.hasContent()) {
      return this.apiService.uploadScript(this.model.Path, this.scriptFile.getFile())
    } else if (this.scriptFile.isInline() && this.scriptFile.hasContent()) {
      return this.apiService.uploadScriptText(this.model.Path, this.scriptFile.getInline())
    }

    return of({status: 'skipped file contents update'})
  }

  ngOnInit(): void {
  }

}
