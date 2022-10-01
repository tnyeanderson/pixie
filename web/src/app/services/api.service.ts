import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { DeviceItem, FileItem } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Set this to a different base URL if running the API on a different server, i.e.
  //host = 'http://apihost:8880'
  host = ''
  baseUrl = `${this.host}/api/v1`
  filesBaseUrl = `${this.host}/files`

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  private handleError = (error: HttpErrorResponse) => {
    let msg = 'An unexpected error occurred'
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      msg = `An error occurred: ${error.error}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      msg = `ERROR ${error.status} ${error.statusText}: ${error.error}`
    }
    // Return an observable with a user-facing error message.
    this._snackBar.open(msg, undefined, {
      duration: 1000 * 3
    })
    return throwError(() => new Error(msg));
  }

  private fileUploadBody(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return formData
  }

  getFiles() {
    return this.httpClient.get(`${this.baseUrl}/files`).pipe(catchError(this.handleError))
  }

  syncFiles() {
    return this.httpClient.post(`${this.baseUrl}/files/sync`, {}).pipe(catchError(this.handleError))
  }

  addFile(file: FileItem) {
    return this.httpClient.post(`${this.baseUrl}/files`, file).pipe(catchError(this.handleError))
  }

  uploadFile(path: string, image: File) {
    return this.httpClient.put(`${this.baseUrl}/files/upload?path=${path}`, this.fileUploadBody(image)).pipe(catchError(this.handleError))
  }

  editFile(id: number, file: FileItem) {
    console.log(file)
    return this.httpClient.put(`${this.baseUrl}/files/${id}`, file).pipe(catchError(this.handleError))
  }

  deleteFile(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/files/${id}`).pipe(catchError(this.handleError))
  }

  getDevices() {
    return this.httpClient.get(`${this.baseUrl}/devices`).pipe(catchError(this.handleError))
  }

  addDevice(device: DeviceItem) {
    return this.httpClient.post(`${this.baseUrl}/devices`, device).pipe(catchError(this.handleError))
  }

  editDevice(id: number, device: DeviceItem) {
    return this.httpClient.put(`${this.baseUrl}/devices/${id}`, device).pipe(catchError(this.handleError))
  }

  deleteDevice(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/devices/${id}`).pipe(catchError(this.handleError))
  }

  getFileContent(path: string) {
    // TODO: Why is error checking commented?
    // Disable logging here to not trigger an update to LastAccessed
    return this.httpClient.get(`${this.filesBaseUrl}/${path}?log=disable`, {responseType: 'blob'}) //.pipe(catchError(this.handleError))
  }

  getLogs() {
    return this.httpClient.get(`${this.baseUrl}/logs`).pipe(catchError(this.handleError))
  }

}
