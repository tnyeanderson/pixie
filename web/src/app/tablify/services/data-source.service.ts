import { Injectable } from '@angular/core';
import { BootConfigsTableDataSource } from 'src/app/lists/boot-configs-list/boot-configs-table-datasource';
import { DevicesTableDataSource } from 'src/app/lists/devices-list/devices-table-datasource';
import { FilesTableDataSource } from 'src/app/lists/files-list/files-table-datasource';
import { LogsTableDataSource } from 'src/app/lists/logs-list/logs-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  createDevicesTableDataSource() {
    return new DevicesTableDataSource()
  }

  createFilesTableDataSource() {
    return new FilesTableDataSource()
  }

  createBootConfigsTableDataSource() {
    return new BootConfigsTableDataSource()
  }

  createLogsTableDataSource() {
    return new LogsTableDataSource()
  }

  constructor() { }
}
