import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DeviceItem, ScriptItem } from 'src/types';
import { FormFields } from '../fields';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {
  fields = FormFields.deviceFields
  scripts: ScriptItem[] = []
  scriptId: any


  constructor(
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceItem,
    private apiService: ApiService
  ) { }

  close = () => { }

  submit = (f: NgForm) => {
    const body: DeviceItem = Object.assign(
      new DeviceItem(),
      f.form.value,
      { ScriptID: this.scriptId }
    )
    if (this.data.ID) {
      this.apiService.editDevice(this.data.ID, body).subscribe(r => {
      this.dialogRef.close()
    })
    }

  }

  delete = (id: number) => {
    this.apiService.deleteDevice(id).subscribe()
  }


  ngOnInit(): void {
    this.scriptId = this.data.ScriptID
    this.apiService.getScripts().subscribe(data => {
      this.scripts = data as ScriptItem[]
    })
  }

}
