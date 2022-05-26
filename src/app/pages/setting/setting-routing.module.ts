import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingPage } from './setting.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPage,
  },
  {
    path: 'tag-edit',
    loadChildren: () => import('~/pages/tag-edit/tag-edit.module').then((m) => m.TagEditPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPageRoutingModule {}
