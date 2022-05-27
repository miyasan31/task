import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingPage } from './setting.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPage,
  },
  {
    path: 'tag',
    loadChildren: () => import('~/pages/tag/tag.module').then((m) => m.TagPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPageRoutingModule {}
