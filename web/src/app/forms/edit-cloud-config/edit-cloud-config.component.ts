import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UploadInline } from 'src/app/formify/formify-components/form-input-upload-inline/upload-inline';
import { UploadInlineService } from 'src/app/formify/formify-services/upload-inline.service';
import { ApiService } from 'src/app/services/api.service';
import { CloudConfigItem } from 'src/types';

@Component({
  selector: 'app-edit-cloud-config',
  templateUrl: './edit-cloud-config.component.html',
  styleUrls: ['./edit-cloud-config.component.scss']
})
export class EditCloudConfigComponent implements OnInit {
  model: CloudConfigItem = new CloudConfigItem()
  cloudConfigFile: UploadInline

  constructor(
    public dialogRef: MatDialogRef<EditCloudConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public initialData: CloudConfigItem,
    private apiService: ApiService,
    private uploadInlineService: UploadInlineService
  ) {
    this.cloudConfigFile = uploadInlineService.create()
  }

  validate = () => !!this.model.Name

  submit = () => {
    if (this.model.ID) {
      this.apiService.editCloudConfig(this.model.ID, this.model).subscribe(r => {
        this.uploadFileOrText().subscribe(r => {
          this.dialogRef.close()
        })
      })
    }
  }

  uploaders = {
    ifUpload: () => {
      return this.apiService.uploadCloudConfig(this.model.Path, this.cloudConfigFile.getFile())
    },
    ifInline: () => {
      return this.apiService.uploadCloudConfigText(this.model.Path, this.cloudConfigFile.getInline())
    },
    otherwise: () => {
      return of({ status: 'skipped file contents update' })
    }
  }

  uploadFileOrText() {
    return this.cloudConfigFile.do(
      this.uploaders.ifUpload,
      this.uploaders.ifInline,
      this.uploaders.otherwise,
    )
  }

  delete = () => {
    if (this.model.ID) {
      this.apiService.deleteCloudConfig(this.model.ID).subscribe(r => {
        this.dialogRef.close()
      })
    }
  }

  initializeContent() {
    this.apiService.getFileContent(`cloudconfigs/${this.initialData.Path}`)
      .subscribe(this.initializeContentFromBlob)
  }

  initializeContentFromBlob = (blob: Blob) => {
    return blob.text().then(text => this.cloudConfigFile.setInlineContent(text))
  }

  ngOnInit(): void {
    this.cloudConfigFile.setModeInline()
    this.initializeContent()
  }
}
