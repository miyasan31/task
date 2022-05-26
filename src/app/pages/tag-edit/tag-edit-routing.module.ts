import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TagEditPage } from './tag-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TagEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagEditPageRoutingModule {}
