import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataSourceService } from 'src/app/tablify/services/data-source.service';
import { ListColumns } from '../../tablify/columns';
import { LogsTableDataSource } from './logs-table-datasource';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss']
})
export class LogsListComponent implements OnInit {
  dataSource: LogsTableDataSource
  columns = ListColumns.logsColumns

  constructor(private apiService: ApiService, private dataSourceService: DataSourceService) {
    this.dataSource = this.dataSourceService.createLogsTableDataSource()
  }

  loadData = () =>  {
    this.dataSource.load(this.apiService)
  }

  ngOnInit(): void {
    this.loadData()
  }

}
