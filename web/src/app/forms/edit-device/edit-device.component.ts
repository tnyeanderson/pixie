import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DeviceItem, FileItem } from 'src/types';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {
  model: DeviceItem = new DeviceItem()
  scripts: FileItem[] = []

  constructor(
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public initialData: DeviceItem,
    private apiService: ApiService
  ) { }

  validate = () => !!this.model.mac

  submit = () => {
    if (this.model.id) {
      this.apiService.editDevice(this.model.id, this.model).subscribe(r => {
        this.dialogRef.close()
      })
    }

  }

  delete = () => {
    if (this.model.id) {
      this.apiService.deleteDevice(this.model.id).subscribe(r => {
        this.dialogRef.close()
      })
    }
  }

  initializeScripts = (value: any) => {
    this.scripts = value as FileItem[]
  }

  ngOnInit(): void {
    this.apiService.getFiles().subscribe(data => this.initializeScripts(data))
  }

}
