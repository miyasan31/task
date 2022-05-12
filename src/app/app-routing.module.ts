import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// 認証情報がない場合はサインイン画面にリダイレクト
const redirectUnauthorized = () => redirectUnauthorizedTo(['signin']);
// 認証情報がある場合はアプリ画面にリダイレクト
const redirectLoggedIn = () => redirectLoggedInTo(['/task']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('~/pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: 'signin',
    loadChildren: () => import('~/pages/signin/signin.module').then((m) => m.SigninPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
  },
  {
    path: 'register',
    loadChildren: () =>
      import('~/pages/register/register.module').then((m) => m.RegisterPageModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
