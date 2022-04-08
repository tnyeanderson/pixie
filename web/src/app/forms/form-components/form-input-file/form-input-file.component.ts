import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input-file',
  templateUrl: './form-input-file.component.html',
  styleUrls: ['./form-input-file.component.scss']
})
export class FormInputFileComponent implements OnInit {
  @Input() files: File[] = [];
  @Input() label: string = 'Upload file'
  @Input() multiple: boolean = false

  constructor() { }

  onSelect(event: any) {
    if (this.multiple) {
      this.files.push(...event.addedFiles);
    } else {
      this.files[0] = event.addedFiles[0]
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {
  }

}
