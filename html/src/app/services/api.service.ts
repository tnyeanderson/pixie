import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8880/api/v1'

  constructor(private httpClient: HttpClient) {}

  getScripts() {
    return this.httpClient.get(`${this.baseUrl}/scripts`)
  }
}
