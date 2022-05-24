import { NgModule } from '@angular/core';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('~/pages/sign-in/sign-in.module').then((m) => m.SignInPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
  },
  {
    path: 'signup',
    loadChildren: () => import('~/pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
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
