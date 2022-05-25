import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TagChartComponent } from '~/components/tag-chart/tag-chart.component';

@NgModule({
  declarations: [TagChartComponent],
  exports: [TagChartComponent],
  imports: [IonicModule, CommonModule],
})
export class TagChartComponentModule {}
