import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ScriptItem } from 'src/types';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-script',
  templateUrl: './add-script.component.html',
  styleUrls: ['./add-script.component.scss']
})
export class AddScriptComponent implements OnInit {
  model: ScriptItem = new ScriptItem()
  files: File[] = []

  constructor(public dialogRef: MatDialogRef<AddScriptComponent>, private apiService: ApiService) { }

  validate = () => (this.model.Name)

  close = () => { }

  submit = () => {
    this.apiService.uploadScript(this.model.Path, this.files[0]).subscribe(r => {
      this.apiService.addScript(this.model).subscribe(r => {
        this.dialogRef.close()
      })

    })
  }

  ngOnInit(): void {
  }

}
