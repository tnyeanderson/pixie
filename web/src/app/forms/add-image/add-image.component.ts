import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageItem } from 'src/types';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {
  model: ImageItem = new ImageItem()
  files: File[] = [];


  constructor(public dialogRef: MatDialogRef<AddImageComponent>, private apiService: ApiService) { }

  validate = () => !!this.model.Name

  submit = () => {
    this.apiService.addImage(this.model).subscribe(r => {
      if (this.files[0]) {
        this.apiService.uploadImage(this.model.Path, this.files[0]).subscribe(r => {
          this.dialogRef.close()
        })
      } else {
        this.dialogRef.close()
      }
    })
  }

  ngOnInit(): void { }

}
