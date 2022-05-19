import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '~/components/components.module';
import { TimelineDetailPage } from '~/pages/timeline-detail/timeline-detail.page';

import { TimelinePage } from './timeline.page';
import { TimelinePageRoutingModule } from './timeline-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TimelinePageRoutingModule, ComponentsModule],
  declarations: [TimelinePage, TimelineDetailPage],
})
export class TimelinePageModule {}
