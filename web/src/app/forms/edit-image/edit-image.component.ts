import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ImageItem } from 'src/types';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent implements OnInit {
  model: ImageItem = new ImageItem()
  files: File[] = []


  constructor(
    public dialogRef: MatDialogRef<EditImageComponent>,
    @Inject(MAT_DIALOG_DATA) public initialData: ImageItem,
    private apiService: ApiService
  ) { }


  validate = () => !!this.model.Name

  submit = () => {
    if (this.model.ID) {
      this.apiService.editImage(this.model.ID, this.model).subscribe(r => {
        if (this.files[0]) {
          this.apiService.uploadImage(this.model.Path, this.files[0]).subscribe(r => {
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
