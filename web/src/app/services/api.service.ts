import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { CloudConfigItem, DeviceItem, ImageItem, ScriptItem } from 'src/types';

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

  getCloudConfigs() {
    return this.httpClient.get(`${this.baseUrl}/cloudconfigs`).pipe(catchError(this.handleError))
  }

  syncCloudConfigs() {
    return this.httpClient.post(`${this.baseUrl}/cloudconfigs/sync`, {}).pipe(catchError(this.handleError))
  }

  addCloudConfig(cloudConfig: CloudConfigItem) {
    return this.httpClient.post(`${this.baseUrl}/cloudconfigs/add`, cloudConfig).pipe(catchError(this.handleError))
  }

  uploadCloudConfig(path: string, cloudConfig: File) {
    return this.httpClient.put(`${this.baseUrl}/upload/cloudconfig?path=${path}`, this.fileUploadBody(cloudConfig)).pipe(catchError(this.handleError))
  }

  uploadCloudConfigText(path: string, cloudConfig: string) {
    return this.httpClient.put(`${this.baseUrl}/upload/cloudconfig?path=${path}`, cloudConfig).pipe(catchError(this.handleError))
  }

  editCloudConfig(id: number, cloudConfig: CloudConfigItem) {
    return this.httpClient.post(`${this.baseUrl}/cloudconfigs/update/${id}`, cloudConfig).pipe(catchError(this.handleError))
  }

  deleteCloudConfig(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/cloudconfigs/delete/${id}`).pipe(catchError(this.handleError))
  }

  getFiles() {
    return this.httpClient.get(`${this.baseUrl}/files`).pipe(catchError(this.handleError))
  }

  syncFiles() {
    return this.httpClient.post(`${this.baseUrl}/files/sync`, {}).pipe(catchError(this.handleError))
  }

  addFile(image: ImageItem) {
    return this.httpClient.post(`${this.baseUrl}/files`, image).pipe(catchError(this.handleError))
  }

  uploadFile(path: string, image: File) {
    return this.httpClient.put(`${this.baseUrl}/files/upload?path=${path}`, this.fileUploadBody(image)).pipe(catchError(this.handleError))
  }

  editFile(id: number, image: ImageItem) {
    return this.httpClient.post(`${this.baseUrl}/files/${id}`, image).pipe(catchError(this.handleError))
  }

  deleteFile(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/files/${id}`).pipe(catchError(this.handleError))
  }

  getImages() {
    return this.httpClient.get(`${this.baseUrl}/images`).pipe(catchError(this.handleError))
  }

  syncImages() {
    return this.httpClient.post(`${this.baseUrl}/images/sync`, {}).pipe(catchError(this.handleError))
  }

  addImage(image: ImageItem) {
    return this.httpClient.post(`${this.baseUrl}/images/add`, image).pipe(catchError(this.handleError))
  }

  uploadImage(path: string, image: File) {
    return this.httpClient.put(`${this.baseUrl}/upload/image?path=${path}`, this.fileUploadBody(image)).pipe(catchError(this.handleError))
  }

  editImage(id: number, image: ImageItem) {
    return this.httpClient.post(`${this.baseUrl}/images/update/${id}`, image).pipe(catchError(this.handleError))
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
    // TODO: Why is error checking commented?
    // Disable logging here to not trigger an update to LastAccessed
    return this.httpClient.get(`${this.filesBaseUrl}/${path}?log=disable`, {responseType: 'blob'}) //.pipe(catchError(this.handleError))
  }

  getLogs() {
    return this.httpClient.get(`${this.baseUrl}/logs`).pipe(catchError(this.handleError))
  }

}
