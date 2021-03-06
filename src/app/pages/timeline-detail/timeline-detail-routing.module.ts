import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimelineDetailPage } from './timeline-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TimelineDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimelineDetailPageRoutingModule {}
