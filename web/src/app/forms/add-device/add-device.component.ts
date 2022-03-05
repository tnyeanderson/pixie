import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DeviceItem, ScriptItem } from 'src/types';
import { FormFields } from '../fields';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  fields = FormFields.deviceFields
  scripts: ScriptItem[] = []
  scriptId: any

  constructor(public dialogRef: MatDialogRef<AddDeviceComponent>, private apiService: ApiService) {

  }

  close = () => { }

  submit = (f: NgForm) => {
    const body: DeviceItem = Object.assign(
      new DeviceItem(),
      f.form.value,
      { ScriptID: this.scriptId }
    )
    this.apiService.addDevice(body).subscribe(r => {
      this.dialogRef.close()
    })
  }

  ngOnInit(): void {
    this.apiService.getScripts().subscribe(data => {
      this.scripts = data as ScriptItem[]
    })
  }

}
