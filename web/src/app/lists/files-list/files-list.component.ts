import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFileComponent } from 'src/app/forms/add-file/add-file.component';
import { EditFileComponent } from 'src/app/forms/edit-file/edit-file.component';
import { DataSourceService } from 'src/app/tablify/services/data-source.service';
import { FileItem } from 'src/types';
import { ApiService } from '../../services/api.service';
import { ListColumns } from '../../tablify/columns';
import { FilesTableDataSource } from './files-table-datasource';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {
  dataSource: FilesTableDataSource
  columns = ListColumns.filesColumns

  constructor(private apiService: ApiService, public dialog: MatDialog, private dataSourceService: DataSourceService) {
    this.dataSource = this.dataSourceService.createFilesTableDataSource()
  }

  editFile = (file: FileItem) => {
    this.openEditFileDialog(file)
  }

  addFile = () => {
    this.openAddFileDialog()
  }

  openEditFileDialog(data: FileItem) {
    const dialogRef = this.dialog.open(EditFileComponent, { width: '80%', data });

    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    })
  }

  openAddFileDialog() {
    const dialogRef = this.dialog.open(AddFileComponent, { width: '80%' });

    this.dialog.afterAllClosed.subscribe(result => {
      this.loadData()
    })
  }

  syncWithFilesystem() {
    this.apiService.syncFiles().subscribe(result => {
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
