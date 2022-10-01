import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FileItem, FILE_TYPES } from 'src/types';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit {
  model: FileItem = new FileItem()
  files: File[] = []
  fileTypes = FILE_TYPES.map(v => { return {ID: v, Name: v} })


  constructor(
    public dialogRef: MatDialogRef<EditFileComponent>,
    @Inject(MAT_DIALOG_DATA) public initialData: FileItem,
    private apiService: ApiService
  ) { }


  validate = () => !!this.model.name

  submit = () => {
    if (this.model.id) {
      this.apiService.editFile(this.model.id, this.model).subscribe(r => {
        if (this.files[0]) {
          this.apiService.uploadFile(this.model.path, this.files[0]).subscribe(r => {
            this.dialogRef.close()
          })
        } else {
          this.dialogRef.close()
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
