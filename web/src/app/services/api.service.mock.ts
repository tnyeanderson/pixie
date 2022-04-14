import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { MatSnackBar } from "@angular/material/snack-bar"
import { of, throwError } from "rxjs"
import { ApiServiceResponsesStub } from "src/testing/stubs"
import { DeviceItem, ImageItem, ScriptItem } from "src/types"

export class MockApiService {
    host = 'testinghost'
    baseUrl = `${this.host}/api/v1`
    filesBaseUrl = `${this.host}/files`

    constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

    private handleError = (error: HttpErrorResponse) => {
        let msg = 'An EXPECTED error occured during testing.. nothing is wrong'
        return throwError(() => new Error(msg));
    }

    private fileUploadBody(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        return formData
    }

    getImages() { }

    syncImages() { }

    addImage(script: ImageItem) { }

    uploadImage(path: string, image: File) { }

    editImage(id: number, image: ImageItem) { }

    deleteImage(id: number) { }

    getScripts() { return of(ApiServiceResponsesStub.getScriptsResponse()) }

    syncScripts() { }

    addScript(script: ScriptItem) { }

    uploadScript(path: string, script: File) { }

    uploadScriptText(path: string, script: string) { }

    editScript(id: number, script: ScriptItem) { }

    deleteScript(id: number) { }

    getDevices() { return of(ApiServiceResponsesStub.getDevicesResponse()) }

    addDevice(device: DeviceItem) { return of(device) }

    editDevice(id: number, device: DeviceItem) { return device }

    deleteDevice(id: number) {
        const device = new DeviceItem()
        device.ID = id
        return of(device)
    }

    getFileContent(path: string) { }

    getLogs() { return of(ApiServiceResponsesStub.getLogsResponse()) }

}