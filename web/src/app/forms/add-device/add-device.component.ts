import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DeviceItem, ScriptItem } from 'src/types';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  model: DeviceItem = new DeviceItem()
  scripts: ScriptItem[] = []

  constructor(public dialogRef: MatDialogRef<AddDeviceComponent>, private apiService: ApiService) { }

  validate = () => !!this.model.Mac

  submit = () => {
    this.apiService.addDevice(this.model).subscribe(r => {
      this.dialogRef.close()
    })
  }

  ngOnInit(): void {
    this.apiService.getScripts().subscribe(data => {
      this.scripts = data as ScriptItem[]
    })
  }

}
