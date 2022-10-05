import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBootConfigComponent } from 'src/app/forms/add-boot-config/add-boot-config.component';
import { EditBootConfigComponent } from 'src/app/forms/edit-boot-config/edit-boot-config.component';
import { DataSourceService } from 'src/app/tablify/services/data-source.service';
import { BootConfigItem } from 'src/types';
import { ApiService } from '../../services/api.service';
import { ListColumns } from '../../tablify/columns';
import { BootConfigsTableDataSource } from './boot-configs-table-datasource';

@Component({
  selector: 'app-boot-configs-list',
  templateUrl: './boot-configs-list.component.html',
  styleUrls: ['./boot-configs-list.component.scss']
})
export class BootConfigsListComponent implements OnInit {
  dataSource: BootConfigsTableDataSource
  columns = ListColumns.bootConfigsColumns

  constructor(private apiService: ApiService, public dialog: MatDialog, private dataSourceService: DataSourceService) {
    this.dataSource = this.dataSourceService.createBootConfigsTableDataSource()
  }

  editBootConfig = (bootConfig: BootConfigItem) => {
    this.openEditBootConfigDialog(bootConfig)
  }

  addBootConfig = () => {
    this.openAddBootConfigDialog()
  }

  deleteBootConfig = (bootConfig: BootConfigItem) => {
    if (bootConfig.id) {
      this.apiService.deleteBootConfig(bootConfig.id).subscribe(data => {
        this.loadData()
      })
    }
  }

  openEditBootConfigDialog(data: BootConfigItem) {
    const dialogRef = this.dialog.open(EditBootConfigComponent, { width: '80%', data });

    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    })
  }

  openAddBootConfigDialog() {
    const dialogRef = this.dialog.open(AddBootConfigComponent, { width: '80%' });

    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    })
  }

  loadData = () => {
    this.dataSource.load(this.apiService)
  }

  ngOnInit(): void {
    this.loadData()
  }

}
