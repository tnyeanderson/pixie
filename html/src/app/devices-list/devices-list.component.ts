import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DevicesTableDataSource } from './devices-table-datasource';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {
  dataSource: DevicesTableDataSource
  displayedColumns = ['ID', 'Name', 'Mac', 'Script.ID']

  constructor(private apiService: ApiService) {
    this.dataSource = new DevicesTableDataSource(apiService)
  }

  ngOnInit(): void {
  }

}
