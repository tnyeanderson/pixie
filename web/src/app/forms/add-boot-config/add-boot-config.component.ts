import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BootConfigItem } from 'src/types';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-boot-config',
  templateUrl: './add-boot-config.component.html',
  styleUrls: ['./add-boot-config.component.scss']
})
export class AddBootConfigComponent implements OnInit {
  model: BootConfigItem = new BootConfigItem()

  constructor(public dialogRef: MatDialogRef<AddBootConfigComponent>, private apiService: ApiService) { }

  validate = () => !!this.model.name

  submit = () => {
    this.apiService.addBootConfig(this.model).subscribe(r => {
      this.dialogRef.close()
    })
  }

  ngOnInit(): void { }

}
