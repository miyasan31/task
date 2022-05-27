import { Component, OnInit } from '@angular/core';

import { AuthService } from '~/services/auth/auth.service';
import { ToastService } from '~/services/toast/toast.service';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(private authService: AuthService, private toastService: ToastService) {}

  ngOnInit() {}

  async onSignOut(): Promise<void> {
    await this.authService.signOut();
    await this.toastService.presentToast('サインアウトしました', 'success');
  }
}
