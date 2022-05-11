import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '~/explore-container/explore-container.module';
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
  declarations: [TimelinePage],
})
export class TimelinePageModule {}
