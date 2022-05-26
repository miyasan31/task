import { Component, OnInit } from '@angular/core';

import { AuthService } from '~/services/auth/auth.service';
import { RouterService } from '~/services/router/router.service';
import { ToastService } from '~/services/toast/toast.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private routerService: RouterService,
  ) {}

  ngOnInit() {}

  navigatePush($event, path?: string): void {
    this.routerService.navigatePush($event, path);
  }

  async onSignOut(): Promise<void> {
    await this.authService.signOut();
    await this.toastService.presentToast('サインアウトしました', 'success');
  }
}
