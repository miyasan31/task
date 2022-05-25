import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyProfilePage } from './my-profile.page';

const routes: Routes = [
  {
    path: '',
    component: MyProfilePage,
  },
  {
    path: 'setting',
    loadChildren: () => import('~/pages/setting/setting.module').then((m) => m.SettingPageModule),
  },
  {
    path: ':userId',
    loadChildren: () =>
      import('~/pages/other-profile/other-profile.module').then((m) => m.OtherProfilePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfilePageRoutingModule {}
