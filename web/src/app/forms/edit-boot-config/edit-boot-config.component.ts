import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { BootConfigItem } from 'src/types';

@Component({
  selector: 'app-edit-boot-config',
  templateUrl: './edit-boot-config.component.html',
  styleUrls: ['./edit-boot-config.component.scss']
})
export class EditBootConfigComponent implements OnInit {
  model: BootConfigItem = new BootConfigItem()


  constructor(
    public dialogRef: MatDialogRef<EditBootConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public initialData: BootConfigItem,
    private apiService: ApiService
  ) { }


  validate = () => !!this.model.name

  submit = () => {
    if (this.model.id) {
      this.apiService.editBootConfig(this.model.id, this.model).subscribe(r => {
        this.dialogRef.close()
      })
    }
  }

  ngOnInit(): void {
  }

}
