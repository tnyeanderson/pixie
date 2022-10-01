import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DeviceItem, FileItem } from 'src/types';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  model: DeviceItem = new DeviceItem()
  scripts: FileItem[] = []

  constructor(public dialogRef: MatDialogRef<AddDeviceComponent>, private apiService: ApiService) { }

  validate = () => !!this.model.mac

  submit = () => {
    this.apiService.addDevice(this.model).subscribe(r => {
      this.dialogRef.close()
    })
  }

  initializeScripts = (value: any) => {
    this.scripts = value as FileItem[]
  }

  ngOnInit(): void {
    this.apiService.getFiles().subscribe(data => this.initializeScripts(data))
  }

}
