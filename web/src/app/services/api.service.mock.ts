import { HttpErrorResponse } from "@angular/common/http"
import { of, throwError } from "rxjs"
import { BootConfigItem, DeviceItem, FileItem, LogItem } from "src/types"
import { ApiService } from "./api.service"

export const MOCK_BLOB_CONTENT = 'blobcontent'

export const MOCK_BLOB = new Blob([MOCK_BLOB_CONTENT])

export const MOCK_FILE = new File([MOCK_BLOB_CONTENT], 'testFile.txt')

export const MOCK_DEVICES = [
    {
        mac: 'testmac',
        id: 3,
    },
    {
        mac: 'mactest',
        id: 42,

    }
] as DeviceItem[]

export const MOCK_FILES = [
    {
        id: 3,
        name: 'name1',

    },
    {
        id: 55,
        name: 'name2',

    }
] as FileItem[]

export const MOCK_BOOT_CONFIGS = [
    {
        id: 3,
        name: 'name1',
        config: '{"test": "value"}',

    },
    {
        id: 55,
        name: 'name2',
        config: '{"test2": "value2"}',

    }
] as BootConfigItem[]

export const MOCK_LOGS = [
    {
        id: 3,
        summary: 'hello',
    },
    {
        id: 35,
        summary: 'hello 2',

    }
] as LogItem[]

// @ts-ignore
export class MockApiService implements ApiService {
    host = 'testinghost'
    baseUrl = `${this.host}/api/v1`
    filesBaseUrl = `${this.host}/files`
    // httpClient = null
    //_snackBar: MatSnackBar

    constructor() { }

    private handleError = (error: HttpErrorResponse) => {
        let msg = 'An EXPECTED error occured during testing.. nothing is wrong'
        return throwError(() => new Error(msg));
    }

    private fileUploadBody(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        return formData
    }

    getFiles() { return of(MOCK_FILES) }

    // TODO: Get return
    syncFiles() { return of({}) }

    addFile(file: FileItem) { return of({ data: file }) }

    uploadFile(path: string, file: File) { return of({ status: `uploaded '${path}'` }) }

    editFile(id: number, file: FileItem) { return of({ data: file }) }

    deleteFile(id: number) {
        const file = new FileItem()
        file.id = id
        return of({ data: file })
    }

    getDevices() { return of(MOCK_DEVICES) }

    addDevice(device: DeviceItem) { return of({ data: device }) }

    editDevice(id: number, device: DeviceItem) { return of({ data: device }) }

    deleteDevice(id: number) {
        const device = new DeviceItem()
        device.id = id
        return of({ data: device })
    }

    getFileContent(path: string) { return of(MOCK_BLOB) }

    getLogs() { return of(MOCK_LOGS) }

}