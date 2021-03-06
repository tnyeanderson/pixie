import { HttpErrorResponse } from "@angular/common/http"
import { of, throwError } from "rxjs"
import { CloudConfigItem, DeviceItem, ImageItem, LogItem, ScriptItem } from "src/types"
import { ApiService } from "./api.service"

export const MOCK_BLOB_CONTENT = 'blobcontent'

export const MOCK_BLOB = new Blob([MOCK_BLOB_CONTENT])

export const MOCK_FILE = new File([MOCK_BLOB_CONTENT], 'testFile.txt')

export const MOCK_CLOUD_CONFIGS = [
    {
        ID: 8,
        Name: 'helloha',
        Path: 'testpathit',
    },
    {
        ID: 87,
        Name: 'hellotwohi',
        Path: 'testpathtoowoo',
    }
] as CloudConfigItem[]

// TODO: IsDefault
export const MOCK_SCRIPTS = [
    {
        ID: 5,
        Name: 'hello',
        Path: 'testpath',
    },
    {
        ID: 57,
        Name: 'hellotwo',
        Path: 'testpathtoo',
    }
] as ScriptItem[]

export const MOCK_DEVICES = [
    {
        Mac: 'testmac',
        ID: 3,
    },
    {
        Mac: 'mactest',
        ID: 42,

    }
] as DeviceItem[]

export const MOCK_IMAGES = [
    {
        ID: 3,
        Name: 'name1',

    },
    {
        ID: 55,
        Name: 'name2',

    }
] as ImageItem[]

export const MOCK_LOGS = [
    {
        ID: 3,
        Summary: 'hello',
    },
    {
        ID: 35,
        Summary: 'hello 2',

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

    getCloudConfigs() { return of(MOCK_CLOUD_CONFIGS) }

    syncCloudConfigs() { return of({}) }

    addCloudConfig(cloudConfig: CloudConfigItem) { return of({data: cloudConfig}) }

    uploadCloudConfig(path: string, cloudConfig: File) { return of({ status: `'${path}' uploaded!` }) }

    uploadCloudConfigText(path: string, cloudConfig: string) { return of({ status: `'${path}' uploaded!` }) }

    editCloudConfig(id: number, cloudConfig: CloudConfigItem) { return of({data: cloudConfig}) }

    deleteCloudConfig(id: number) {
        const cloudConfig = new CloudConfigItem()
        cloudConfig.ID = id
        return of({ data: cloudConfig })
    }

    getImages() { return of(MOCK_IMAGES) }

    // TODO: Get return
    syncImages() { return of({}) }

    addImage(image: ImageItem) { return of({ data: image }) }

    uploadImage(path: string, image: File) { return of({ status: `'${path}' uploaded!` }) }

    editImage(id: number, image: ImageItem) { return of({ data: image }) }

    deleteImage(id: number) {
        const image = new ImageItem()
        image.ID = id
        return of({ data: image })
    }

    getScripts() { return of(MOCK_SCRIPTS) }

    // TODO: Get return
    syncScripts() { return of({}) }

    addScript(script: ScriptItem) { return of({ data: script }) }

    uploadScript(path: string, script: File) { return of({ status: `'${path}' uploaded!` }) }

    uploadScriptText(path: string, script: string) { return of({ status: `'${path}' uploaded!` }) }

    editScript(id: number, script: ScriptItem) { return of({ data: script }) }

    deleteScript(id: number) {
        const script = new ScriptItem()
        script.ID = id
        return of({ data: script })
    }

    getDevices() { return of(MOCK_DEVICES) }

    addDevice(device: DeviceItem) { return of({ data: device }) }

    editDevice(id: number, device: DeviceItem) { return of({ data: device }) }

    deleteDevice(id: number) {
        const device = new DeviceItem()
        device.ID = id
        return of({ data: device })
    }

    getFileContent(path: string) { return of(MOCK_BLOB) }

    getLogs() { return of(MOCK_LOGS) }

}