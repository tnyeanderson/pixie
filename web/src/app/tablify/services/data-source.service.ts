import { Injectable } from '@angular/core';
import { CloudConfigsTableDataSource } from 'src/app/lists/cloud-configs-list/cloud-configs-table-datasource';
import { DevicesTableDataSource } from 'src/app/lists/devices-list/devices-table-datasource';
import { ImagesTableDataSource } from 'src/app/lists/images-list/images-table-datasource';
import { LogsTableDataSource } from 'src/app/lists/logs-list/logs-table-datasource';
import { ScriptsTableDataSource } from 'src/app/lists/scripts-list/scripts-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  createDevicesTableDataSource() {
    return new DevicesTableDataSource()
  }

  createCloudConfigsTableDataSource() {
    return new CloudConfigsTableDataSource()
  }

  createImagesTableDataSource() {
    return new ImagesTableDataSource()
  }

  createLogsTableDataSource() {
    return new LogsTableDataSource()
  }

  createScriptsTableDataSource() {
    return new ScriptsTableDataSource()
  }

  constructor() { }
}
