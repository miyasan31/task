import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'timeline',
        loadChildren: () =>
          import('~/pages/timeline/timeline.module').then((m) => m.TimelinePageModule),
      },
      {
        path: 'task',
        loadChildren: () => import('~/pages/task/task.module').then((m) => m.TaskPageModule),
      },
      {
        path: 'my-profile',
        loadChildren: () =>
          import('~/pages/my-profile/my-profile.module').then((m) => m.MyProfilePageModule),
      },
      {
        path: '',
        redirectTo: '/timeline',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/timeline',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
