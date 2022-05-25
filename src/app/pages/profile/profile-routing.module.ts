import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
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
export class ProfilePageRoutingModule {}
