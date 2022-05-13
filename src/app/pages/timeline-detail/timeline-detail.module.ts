import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TimelineDetailPageRoutingModule } from './timeline-detail-routing.module';
import { ComponentsModule } from '~/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimelineDetailPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [],
})
export class TimelineDetailPageModule {}
