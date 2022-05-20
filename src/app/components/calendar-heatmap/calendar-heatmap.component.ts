import { Component, OnInit } from '@angular/core';
import { CalendarData, CalendarOptions, RandomDataService } from 'ng-calendar-heatmap';

@Component({
  selector: 'app-calendar-heatmap',
  templateUrl: './calendar-heatmap.component.html',
  styleUrls: ['./calendar-heatmap.component.scss'],
})
export class CalendarHeatmapComponent implements OnInit {
  calendarData: CalendarData[] = [];
  calendarOptions: CalendarOptions = {
    // responsive: false,
    colorRange: ['#3880ff', '#fff'],
    tooltipEnabled: false,
    locale: {
      months: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
      days: [''],
      no: 'ノー！',
      on: 'オン！',
      less: 'レス！',
      more: 'モアー！',
    },
  };

  constructor(protected randomDataService: RandomDataService) {
    this.calendarData = randomDataService.generate(10, 20);
  }

  ngOnInit() {}
}
