import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScriptItem } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8880/api/v1'

  static gormModelFields = [
    'ID',
    'CreatedAt',
    'UpdatedAt',
    'DeletedAt',
  ]

  static scriptFields = [
    'Name',
    'Path'
  ]

  static deviceFields = [
    'Name',
    'Mac',
    'GroupName',
    'ScriptID',
    'Script'
  ]

  static viewScriptFields = [
    ...ApiService.gormModelFields,
    ...ApiService.scriptFields
  ]

  static viewDeviceFields = [
    ...ApiService.gormModelFields,
    ...ApiService.deviceFields
  ]

  constructor(private httpClient: HttpClient) {}

  getScripts() {
    return this.httpClient.get(`${this.baseUrl}/scripts`)
  }

  getDevices() {
    return this.httpClient.get(`${this.baseUrl}/devices`)
  }

  addScript(script: ScriptItem) {
    return this.httpClient.post(`${this.baseUrl}/scripts/add`, script)
  }

  uploadScript(path: string, scriptText: string) {
    return this.httpClient.put(`${this.baseUrl}/upload/script?path=${path}`, scriptText)
  }
}
