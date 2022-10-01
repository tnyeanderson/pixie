import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileItem, FILE_TYPES } from 'src/types';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  model: FileItem = new FileItem()
  files: File[] = [];
  fileTypes = FILE_TYPES.map(v => { return {ID: v, Name: v} })


  constructor(public dialogRef: MatDialogRef<AddFileComponent>, private apiService: ApiService) { }

  validate = () => !!this.model.name

  submit = () => {
    this.apiService.addFile(this.model).subscribe(r => {
      if (this.files[0]) {
        this.apiService.uploadFile(this.model.path, this.files[0]).subscribe(r => {
          this.dialogRef.close()
        })
      } else {
        this.dialogRef.close()
      }
    })
  }

  ngOnInit(): void { }

}
