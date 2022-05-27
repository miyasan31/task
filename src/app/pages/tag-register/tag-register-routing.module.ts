import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagRegisterPage } from './tag-register.page';

const routes: Routes = [
  {
    path: '',
    component: TagRegisterPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagRegisterPageRoutingModule {}
