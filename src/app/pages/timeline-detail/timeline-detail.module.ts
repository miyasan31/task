import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '~/components/components.module';

import { TimelineDetailPageRoutingModule } from './timeline-detail-routing.module';

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
