import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelinePage } from './timeline.page';
import { TimelineDetailPage } from '~/timeline-detail/timeline-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TimelinePage,
  },
  {
    path: ':userId',
    component: TimelineDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelinePageRoutingModule {}
