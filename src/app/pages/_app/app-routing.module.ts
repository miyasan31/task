import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('~/pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'signin',
    loadChildren: () => import('~/pages/signin/signin.module').then((m) => m.SigninPageModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
