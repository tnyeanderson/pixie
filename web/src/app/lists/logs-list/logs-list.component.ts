import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
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

  constructor(private apiService: ApiService) {
    // TODO: Why?
    this.dataSource = new LogsTableDataSource(apiService)
  }

  ngOnInit(): void { }

}
