import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-counter',
  templateUrl: './stats-counter.component.html',
  styleUrls: ['./stats-counter.component.scss']
})
export class StatsCounterComponent implements OnInit {
  @Input() value: number | string = '-'
  @Input() label: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
