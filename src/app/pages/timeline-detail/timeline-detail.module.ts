import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedComponentsModule } from '~/components/shared/shared-components.module';

import { TimelineDetailPageRoutingModule } from './timeline-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimelineDetailPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [],
})
export class TimelineDetailPageModule {}
