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
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {
  }

}
