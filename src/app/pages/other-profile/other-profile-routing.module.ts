import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OtherProfilePage } from './other-profile.page';

const routes: Routes = [
  {
    path: '',
    component: OtherProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherProfilePageRoutingModule {}
