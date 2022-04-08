import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ScriptItem } from 'src/types';
import { FormFields } from '../fields';

@Component({
  selector: 'app-edit-script',
  templateUrl: './edit-script.component.html',
  styleUrls: ['./edit-script.component.scss']
})
export class EditScriptComponent implements OnInit {
  model: ScriptItem

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
    if (this.model.ID) {
      this.apiService.editScript(this.model.ID, this.model).subscribe(r => {
        this.dialogRef.close()
      })
    }
  }

  delete = () => {
    if (this.model.ID) {
      this.apiService.deleteScript(this.model.ID).subscribe()
    }
  }

  ngOnInit(): void {
  }

}
