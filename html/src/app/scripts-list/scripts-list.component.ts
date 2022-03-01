import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScriptItem } from 'src/types';
import { AddScriptComponent } from '../forms/add-script/add-script.component';
import { EditScriptComponent } from '../forms/edit-script/edit-script.component';
import { Field, FormFields } from '../forms/fields';
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
  allColumns: Field[]

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.allColumns = FormFields.viewScriptFields
    this.dataSource = new ScriptsTableDataSource(apiService)
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
      this.dataSource.load()
    })
  }

  openAddScriptDialog() {
    const dialogRef = this.dialog.open(AddScriptComponent, { width: '80%' });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.load()
    });
  }

  ngOnInit(): void {
  }

}
