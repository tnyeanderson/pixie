import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-script',
  templateUrl: './add-script.component.html',
  styleUrls: ['./add-script.component.scss']
})
export class AddScriptComponent implements OnInit {
  fields = ApiService.scriptFields

  constructor(public dialogRef: MatDialogRef<AddScriptComponent>, private apiService: ApiService) { }

  close() {
    this.dialogRef.close()
  }

  save(f: NgForm) {
    this.apiService.uploadScript(f.form.value.Path, f.form.value.scriptContent).subscribe()
    this.apiService.addScript(f.form.value).subscribe()
    this.dialogRef.close()
  }

  ngOnInit(): void {
  }

}
