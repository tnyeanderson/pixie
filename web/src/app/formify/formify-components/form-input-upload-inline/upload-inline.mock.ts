import { Observable, of } from "rxjs"
import { MOCK_FILE } from "src/app/services/api.service.mock"
import { UploadInline } from "./upload-inline"

export const MOCK_INLINE_CONTENT = 'MOCKCONTENT'

export class MockUploadInline implements UploadInline {
    // These values correspond to tab indexes
    formats = {
        upload: 0,
        inline: 1
    }
    scriptContent: any = { Content: MOCK_INLINE_CONTENT }
    files: File[] = [MOCK_FILE]
    format = this.formats.upload

    setModeInline(): void { }

    setModeUpload(): void { }

    isInline(): boolean { return false }

    isUpload(): boolean { return true }

    setInlineContent(content: string) { }

    getInline(): string { return MOCK_INLINE_CONTENT }

    getFile(): File { return MOCK_FILE }

    hasContent(): boolean { return false }

    hasInlineContent(): boolean { return false }

    hasFileContent(): boolean { return false }

    do(ifUpload: Function, ifInline: Function, otherwise: Function): Observable<any> { return of({})}
}