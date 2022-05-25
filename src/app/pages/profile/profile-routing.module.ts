import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TagDetailPage } from '~/pages/tag-detail/tag-detail.page';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
