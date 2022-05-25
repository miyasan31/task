import { Component, Input, OnInit } from '@angular/core';

import { ITagChart } from '~/interfaces/profile/ITagChart';

@Component({
  selector: 'app-tag-chart',
  templateUrl: './tag-chart.component.html',
  styleUrls: ['./tag-chart.component.scss'],
})
export class TagChartComponent implements OnInit {
  @Input() tagChart: ITagChart[];
  @Input() userId: string;

  constructor() {}

  ngOnInit() {}
}
