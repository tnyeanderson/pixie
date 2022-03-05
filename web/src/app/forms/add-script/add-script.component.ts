import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { FormFields } from '../fields';

@Component({
  selector: 'app-add-script',
  templateUrl: './add-script.component.html',
  styleUrls: ['./add-script.component.scss']
})
export class AddScriptComponent implements OnInit {
  fields = FormFields.scriptFields

  constructor(public dialogRef: MatDialogRef<AddScriptComponent>, private apiService: ApiService) { }

  close = () => { }

  submit = (f: NgForm) => {
    this.apiService.uploadScript(f.form.value.Path, f.form.value.scriptContent).subscribe(r => {
      this.apiService.addScript(f.form.value).subscribe(r => {
        this.dialogRef.close()
      })

    })
  }

  ngOnInit(): void {
  }

}
