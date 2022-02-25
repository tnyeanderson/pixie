import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddScriptComponent } from '../add-script/add-script.component';
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
  allColumns: string[]

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.allColumns = ApiService.viewScriptFields
    this.dataSource = new ScriptsTableDataSource(apiService)
  }

  addScript() {
    console.log('Adding')
    this.openAddScriptDialog()
  }

  openAddScriptDialog() {
    const dialogRef = this.dialog.open(AddScriptComponent, {width: '80%'});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  }

}
