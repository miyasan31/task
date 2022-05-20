import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CalendarHeatmapModule } from 'ng-calendar-heatmap';

import { CalendarHeatmapComponent } from './calendar-heatmap.component';

@NgModule({
  declarations: [CalendarHeatmapComponent],
  exports: [CalendarHeatmapComponent],
  imports: [IonicModule, CommonModule, FormsModule, CalendarHeatmapModule],
})
export class CalenderHeatmapComponentModule {}
