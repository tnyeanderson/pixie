import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reload-button',
  templateUrl: './reload-button.component.html',
  styleUrls: ['./reload-button.component.scss']
})
export class ReloadButtonComponent implements OnInit {
  @Input() reload: Function = () => {}

  constructor() { }

  ngOnInit(): void {
  }

}
