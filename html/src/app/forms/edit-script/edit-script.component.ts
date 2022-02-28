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
  fields = FormFields.scriptFields

  constructor(public dialogRef: MatDialogRef<EditScriptComponent>, @Inject(MAT_DIALOG_DATA) public data: ScriptItem, private apiService: ApiService) { }

  close = () => { }

  submit = (f: NgForm) => {
    if (this.data.ID) {
      this.apiService.editScript(this.data.ID, f.form.value).subscribe(r => {
        this.dialogRef.close()
      })
    }
  }

  delete = (id: number) => {
    this.apiService.deleteScript(id).subscribe()
  }

  ngOnInit(): void {
  }

}
