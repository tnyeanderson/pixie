import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FileItem } from 'src/types';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit {
  model: FileItem = new FileItem()
  files: File[] = []


  constructor(
    public dialogRef: MatDialogRef<EditFileComponent>,
    @Inject(MAT_DIALOG_DATA) public initialData: FileItem,
    private apiService: ApiService
  ) { }


  validate = () => !!this.model.Name

  submit = () => {
    if (this.model.ID) {
      this.apiService.editFile(this.model.ID, this.model).subscribe(r => {
        if (this.files[0]) {
          this.apiService.uploadFile(this.model.Path, this.files[0]).subscribe(r => {
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
