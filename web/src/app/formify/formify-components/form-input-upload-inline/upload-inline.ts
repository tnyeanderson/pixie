import { Observable } from "rxjs"

export class UploadInline {
    // These values correspond to tab indexes
    formats = {
        upload: 0,
        inline: 1
    }
    scriptContent: any = { Content: '' }
    files: File[] = []
    // format: Observable<string> = of(this.formats.upload)
    format = this.formats.upload

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
        return (this.isInline() && this.scriptContent.Content) || (this.isUpload() && this.files.length > 0)
    }

    do(ifUpload: Function, ifInline: Function, otherwise: Function): Observable<any> {
        if (this.isUpload() && this.hasContent()) {
            return ifUpload()
        } else if (this.isInline() && this.hasContent()) {
            return ifInline()
        }

        return otherwise()
    }
}