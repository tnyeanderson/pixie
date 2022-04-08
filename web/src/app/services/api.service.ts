import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { DeviceItem, ImageItem, ScriptItem } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = 'http://localhost:8880'
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

  getImages() {
    return this.httpClient.get(`${this.baseUrl}/images`).pipe(catchError(this.handleError))
  }

  syncImages() {
    return this.httpClient.post(`${this.baseUrl}/images/sync`, {}).pipe(catchError(this.handleError))
  }

  addImage(script: ImageItem) {
    return this.httpClient.post(`${this.baseUrl}/images/add`, script).pipe(catchError(this.handleError))
  }

  uploadImage(path: string, image: File) {
    return this.httpClient.put(`${this.baseUrl}/upload/image?path=${path}`, this.fileUploadBody(image)).pipe(catchError(this.handleError))
  }

  editImage(id: number, script: ImageItem) {
    return this.httpClient.post(`${this.baseUrl}/images/update/${id}`, script).pipe(catchError(this.handleError))
  }

  deleteImage(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/images/delete/${id}`).pipe(catchError(this.handleError))
  }

  getScripts() {
    return this.httpClient.get(`${this.baseUrl}/scripts`).pipe(catchError(this.handleError))
  }

  syncScripts() {
    return this.httpClient.post(`${this.baseUrl}/scripts/sync`, {}).pipe(catchError(this.handleError))
  }

  addScript(script: ScriptItem) {
    return this.httpClient.post(`${this.baseUrl}/scripts/add`, script).pipe(catchError(this.handleError))
  }

  uploadScript(path: string, script: File) {
    return this.httpClient.put(`${this.baseUrl}/upload/script?path=${path}`, this.fileUploadBody(script)).pipe(catchError(this.handleError))
  }

  uploadScriptText(path: string, script: string) {
    return this.httpClient.put(`${this.baseUrl}/upload/script?path=${path}`, script).pipe(catchError(this.handleError))
  }

  editScript(id: number, script: ScriptItem) {
    return this.httpClient.post(`${this.baseUrl}/scripts/update/${id}`, script).pipe(catchError(this.handleError))
  }

  deleteScript(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/scripts/delete/${id}`).pipe(catchError(this.handleError))
  }

  getDevices() {
    return this.httpClient.get(`${this.baseUrl}/devices`).pipe(catchError(this.handleError))
  }

  addDevice(device: DeviceItem) {
    return this.httpClient.post(`${this.baseUrl}/devices/add`, device).pipe(catchError(this.handleError))
  }

  editDevice(id: number, device: DeviceItem) {
    return this.httpClient.post(`${this.baseUrl}/devices/update/${id}`, device).pipe(catchError(this.handleError))
  }

  deleteDevice(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/devices/delete/${id}`).pipe(catchError(this.handleError))
  }

  getFileContent(path: string) {
    return this.httpClient.get(`${this.filesBaseUrl}/${path}`, {responseType: 'blob'}) //.pipe(catchError(this.handleError))
  }

}
