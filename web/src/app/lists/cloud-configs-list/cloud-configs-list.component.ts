import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCloudConfigComponent } from 'src/app/forms/add-cloud-config/add-cloud-config.component';
import { EditCloudConfigComponent } from 'src/app/forms/edit-cloud-config/edit-cloud-config.component';
import { ApiService } from 'src/app/services/api.service';
import { ListColumns } from 'src/app/tablify/columns';
import { DataSourceService } from 'src/app/tablify/services/data-source.service';
import { CloudConfigItem } from 'src/types';
import { CloudConfigsTableDataSource } from './cloud-configs-table-datasource';

@Component({
  selector: 'app-cloud-configs-list',
  templateUrl: './cloud-configs-list.component.html',
  styleUrls: ['./cloud-configs-list.component.scss']
})
export class CloudConfigsListComponent implements OnInit {
  dataSource: CloudConfigsTableDataSource
  columns = ListColumns.cloudConfigsColumns

  constructor(private apiService: ApiService, public dialog: MatDialog, private dataSourceService: DataSourceService) {
    this.dataSource = this.dataSourceService.createCloudConfigsTableDataSource()
  }

  editCloudConfig = (cloudConfig: CloudConfigItem) => {
    this.openEditCloudConfigDialog(cloudConfig)
  }

  addCloudConfig = () => {
    this.openAddCloudConfigDialog()
  }

  openEditCloudConfigDialog(data: CloudConfigItem) {
    const dialogRef = this.dialog.open(EditCloudConfigComponent, { width: '80%', data });

    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    })
  }

  openAddCloudConfigDialog() {
    const dialogRef = this.dialog.open(AddCloudConfigComponent, { width: '80%' });

    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    })
  }

  syncWithFilesystem() {
    this.apiService.syncCloudConfigs().subscribe(result => {
      this.loadData()
    })
  }

  loadData() {
    this.dataSource.load(this.apiService)
  }

  ngOnInit(): void {
    this.loadData()
  }

}
