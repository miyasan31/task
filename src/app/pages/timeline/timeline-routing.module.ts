import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimelineDetailPage } from '~/pages/timeline-detail/timeline-detail.page';

import { TimelinePage } from './timeline.page';

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
