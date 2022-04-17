import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSourceService } from 'src/app/tablify/services/data-source.service';
import { ScriptItem } from 'src/types';
import { AddScriptComponent } from '../../forms/add-script/add-script.component';
import { EditScriptComponent } from '../../forms/edit-script/edit-script.component';
import { ApiService } from '../../services/api.service';
import { ListColumns } from '../../tablify/columns';
import { ScriptsTableDataSource } from './scripts-table-datasource';

@Component({
  selector: 'app-scripts-list',
  templateUrl: './scripts-list.component.html',
  styleUrls: ['./scripts-list.component.scss']
})
export class ScriptsListComponent implements OnInit {
  dataSource: ScriptsTableDataSource
  columns = ListColumns.scriptsColumns

  constructor(private apiService: ApiService, public dialog: MatDialog, private dataSourceService: DataSourceService) {
    // TODO: Why?
    this.dataSource = this.dataSourceService.createScriptsTableDataSource()
  }

  editScript = (script: ScriptItem) => {
    this.openEditScriptDialog(script)
  }

  addScript = () => {
    this.openAddScriptDialog()
  }

  openEditScriptDialog(data: ScriptItem) {
    const dialogRef = this.dialog.open(EditScriptComponent, { width: '80%', data });

    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    })
  }

  openAddScriptDialog() {
    const dialogRef = this.dialog.open(AddScriptComponent, { width: '80%' });

    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    })
  }

  syncWithFilesystem() {
    this.apiService.syncScripts().subscribe(result => {
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
