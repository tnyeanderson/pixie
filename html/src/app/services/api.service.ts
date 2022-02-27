import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, tap, throwError } from 'rxjs';
import { ScriptItem } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  baseUrl = 'http://localhost:8880/api/v1'

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

  getScripts() {
    return this.httpClient.get(`${this.baseUrl}/scripts`).pipe(catchError(this.handleError))
  }

  addScript(script: ScriptItem) {
    return this.httpClient.post(`${this.baseUrl}/scripts/add`, script).pipe(catchError(this.handleError))
  }

  uploadScript(path: string, scriptText: string) {
    return this.httpClient.put(`${this.baseUrl}/upload/script?path=${path}`, scriptText).pipe(catchError(this.handleError))
  }

  editScript(id: number, script: ScriptItem) {
    return this.httpClient.post(`${this.baseUrl}/scripts/update/${id}`, script).pipe(catchError(this.handleError))
  }

  getDevices() {
    return this.httpClient.get(`${this.baseUrl}/devices`).pipe(catchError(this.handleError))
  }

}
