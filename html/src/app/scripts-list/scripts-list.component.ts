import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ScriptsTableDataSource } from './scripts-table-datasource';

@Component({
  selector: 'app-scripts-list',
  templateUrl: './scripts-list.component.html',
  styleUrls: ['./scripts-list.component.scss']
})
export class ScriptsListComponent implements OnInit {
  dataSource: ScriptsTableDataSource
  displayedColumns = ['ID', 'Name', 'Path']

  constructor(private apiService: ApiService) {
    this.dataSource = new ScriptsTableDataSource(apiService)
  }

  ngOnInit(): void {
  }

}
