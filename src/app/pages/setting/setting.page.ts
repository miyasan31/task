import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { AuthService } from '~/services/auth/auth.service';
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
    private alertController: AlertController,
  ) {}

  ngOnInit() {}

  async onSignOut(): Promise<void> {
    const alert = await this.alertController.create({
      message: 'サインアウトしますか？',
      buttons: [
        {
          text: 'キャンセル',
        },
        {
          role: 'destructive',
          text: 'サインアウト',
          handler: async () => {
            await this.authService.signOut();
            await this.alertController.dismiss();
            await this.toastService.presentToast('サインアウトしました', 'success');
          },
        },
      ],
    });

    await alert.present();
  }
}
