import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-expander',
  templateUrl: './text-expander.component.html',
  styleUrls: ['./text-expander.component.scss']
})
export class TextExpanderComponent implements OnInit {
  @Input() height: string = '3em'
  @Input() width: string = 'auto'

  constructor() { }

  ngOnInit(): void {
  }

}
