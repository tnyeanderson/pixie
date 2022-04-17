import { Observable } from "rxjs"

export class UploadInline {
    // These values correspond to tab indexes
    formats = {
        upload: 0,
        inline: 1
    }
    scriptContent: any = { Content: '' }
    files: File[] = []
    format = this.formats.upload

    setModeInline() {
        this.format = this.formats.inline
    }

    setModeUpload() {
        this.format = this.formats.upload
    }

    isInline(): boolean {
        return this.format === this.formats.inline
    }

    isUpload(): boolean {
        return this.format === this.formats.upload
    }

    setInlineContent(content: string) {
        this.scriptContent.Content = content
    }

    getInline(): string {
        return this.scriptContent.Content
    }

    getFile(): File {
        return this.files[0]
    }

    hasContent(): boolean {
        return this.hasInlineContent() || this.hasFileContent()
    }

    hasInlineContent(): boolean {
        return (this.isInline() && !!this.scriptContent.Content)
    }

    hasFileContent(): boolean {
        return (this.isUpload() && this.files.length > 0)
    }

    do(ifUpload: Function, ifInline: Function, otherwise: Function): Observable<any> {
        if (this.hasFileContent()) {
            return ifUpload()
        } else if (this.hasInlineContent()) {
            return ifInline()
        } else {
            return otherwise()
        }
    }
}