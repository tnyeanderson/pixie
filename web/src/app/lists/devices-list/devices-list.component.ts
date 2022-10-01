import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDeviceComponent } from 'src/app/forms/edit-device/edit-device.component';
import { DataSourceService } from 'src/app/tablify/services/data-source.service';
import { DeviceItem } from 'src/types';
import { AddDeviceComponent } from '../../forms/add-device/add-device.component';
import { ApiService } from '../../services/api.service';
import { ListColumns } from '../../tablify/columns';
import { DevicesTableDataSource } from './devices-table-datasource';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {
  dataSource: DevicesTableDataSource
  columns = ListColumns.devicesColumns

  constructor(private apiService: ApiService, public dialog: MatDialog, private dataSourceService: DataSourceService) {
    this.dataSource = dataSourceService.createDevicesTableDataSource()
  }

  editDevice = (device: DeviceItem) => {
    this.openEditDeviceDialog(device)
  }

  addDevice = () => {
    this.openAddDeviceDialog()
  }

  deleteDevice = (device: DeviceItem) => {
    if (device.id) {
      this.apiService.deleteDevice(device.id).subscribe(data => {
        this.loadData()
      })
    }
  }

  openEditDeviceDialog(data: DeviceItem) {
    const dialogRef = this.dialog.open(EditDeviceComponent, { width: '80%', data });

    // TODO: Should this be dialogRef.afterClosed ?
    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    })
  }

  openAddDeviceDialog() {
    const dialogRef = this.dialog.open(AddDeviceComponent, { width: '80%' });

    // TODO: Should this be dialogRef.afterClosed ?
    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    });
  }

  loadData = () => {
    this.dataSource.load(this.apiService)
  }

  ngOnInit(): void {
    this.loadData()
  }

}
