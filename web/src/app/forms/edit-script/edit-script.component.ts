import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ScriptItem } from 'src/types';

@Component({
  selector: 'app-edit-script',
  templateUrl: './edit-script.component.html',
  styleUrls: ['./edit-script.component.scss']
})
export class EditScriptComponent implements OnInit {
  model: ScriptItem
  scriptContent: any = { Content: '' }

  constructor(
    public dialogRef: MatDialogRef<EditScriptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScriptItem,
    private apiService: ApiService
  ) {
    this.model = Object.assign(new ScriptItem(), data)
  }

  validate = () => (this.model.Name)

  close = () => { }

  submit = () => {
    console.log('submitted', this.model, this.scriptContent)
    if (this.model.ID) {
      this.apiService.editScript(this.model.ID, this.model).subscribe(r => {
        this.apiService.uploadScriptText(this.model.Path, this.scriptContent.Content).subscribe(r => {
          this.dialogRef.close()
        })
      })
    }
  }

  delete = () => {
    if (this.model.ID) {
      this.apiService.deleteScript(this.model.ID).subscribe()
    }
  }

  ngOnInit(): void {
    this.apiService.getFileContent(`scripts/${this.model.Path}`).subscribe((r: Blob) => {
      r.text().then(text => {
        this.scriptContent.Content = text
      })
    })
  }

}
