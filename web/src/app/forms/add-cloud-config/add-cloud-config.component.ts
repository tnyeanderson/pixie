import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UploadInline } from 'src/app/formify/formify-components/form-input-upload-inline/upload-inline';
import { UploadInlineService } from 'src/app/formify/formify-services/upload-inline.service';
import { ApiService } from 'src/app/services/api.service';
import { CloudConfigItem } from 'src/types';

@Component({
  selector: 'app-add-cloud-config',
  templateUrl: './add-cloud-config.component.html',
  styleUrls: ['./add-cloud-config.component.scss']
})
export class AddCloudConfigComponent implements OnInit {
  model: CloudConfigItem = new CloudConfigItem()
  cloudConfigFile: UploadInline

  constructor(public dialogRef: MatDialogRef<AddCloudConfigComponent>, private apiService: ApiService, private uploadInlineService: UploadInlineService) {
    this.cloudConfigFile = uploadInlineService.create()
  }

  fileAdded = (event: any) => {
    const file: File = event.addedFiles[0]
    this.model.Name = this.model.Name || file.name
    this.model.Path = this.model.Path || file.name
  }

  validate = () => !!this.model.Name

  submit = () => {
    this.apiService.addCloudConfig(this.model).subscribe(r => {
      this.uploadFileOrText().subscribe(r => {
        this.dialogRef.close()
      })
    })
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
      this.uploaders.otherwise
    )
  }

  ngOnInit(): void { }

}
