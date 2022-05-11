import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '~/pages/explore-container/explore-container.module';
import { TimelineDetailPage } from '~/pages/timeline-detail/timeline-detail.page';
import { ComponentsModule } from '~/components/components.module';

import { TimelinePage } from './timeline.page';
import { TimelinePageRoutingModule } from './timeline-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimelinePageRoutingModule,
    ExploreContainerComponentModule,
    ComponentsModule,
  ],
  declarations: [TimelinePage, TimelineDetailPage],
})
export class TimelinePageModule {}
