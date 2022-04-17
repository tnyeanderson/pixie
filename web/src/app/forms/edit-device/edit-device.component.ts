import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DeviceItem, ScriptItem } from 'src/types';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {
  model: DeviceItem
  scripts: ScriptItem[] = []

  constructor(
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceItem,
    private apiService: ApiService
  ) {
    // TODO: Why is this like this?
    this.model = Object.assign(new DeviceItem(), data)
  }

  validate = () => !!this.model.Mac

  submit = () => {
    if (this.model.ID) {
      this.apiService.editDevice(this.model.ID, this.model).subscribe(r => {
      this.dialogRef.close()
    })
    }

  }

  delete = () => {
    if (this.model.ID) {
      this.apiService.deleteDevice(this.model.ID).subscribe()
    }
  }


  ngOnInit(): void {
    // TODO: test
    this.apiService.getScripts().subscribe(data => {
      this.scripts = data as ScriptItem[]
    })
  }

}
