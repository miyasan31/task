import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalendarHeatmapComponent } from '~/pages/profile/components/calendar-heatmap/calendar-heatmap.component';
import { CalendarHeatmapModule } from 'ng-calendar-heatmap';

@NgModule({
  declarations: [CalendarHeatmapComponent],
  exports: [CalendarHeatmapComponent],
  imports: [IonicModule, CommonModule, FormsModule, CalendarHeatmapModule],
})
export class CalenderHeatmapComponentModule {}
