import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDeviceComponent } from 'src/app/forms/edit-device/edit-device.component';
import { DeviceItem } from 'src/types';
import { AddDeviceComponent } from '../../forms/add-device/add-device.component';
import { ApiService } from '../../services/api.service';
import { ListColumns } from '../columns';
import { DevicesTableDataSource } from './devices-table-datasource';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {
  dataSource: DevicesTableDataSource
  columns = ListColumns.devicesColumns

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.dataSource = new DevicesTableDataSource(apiService)
  }

  editDevice = (device: DeviceItem) => {
    this.openEditDeviceDialog(device)
  }

  addDevice = () => {
    this.openAddDeviceDialog()
  }

  openEditDeviceDialog(data: DeviceItem) {
    const dialogRef = this.dialog.open(EditDeviceComponent, { width: '80%', data });

    // TODO: Should this be dialogRef.afterClosed ?
    this.dialog.afterAllClosed.subscribe(result => {
      this.dataSource.load()
    })
  }

  openAddDeviceDialog() {
    const dialogRef = this.dialog.open(AddDeviceComponent, { width: '80%' });

    // TODO: Should this be dialogRef.afterClosed ?
    this.dialog.afterAllClosed.subscribe(result => {
      this.dataSource.load()
    });
  }

  ngOnInit(): void {
  }

}
