import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { toastOption, ToastStatus } from './toastOption';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast(message: string, status: ToastStatus): Promise<void> {
    const toast = await this.toastController.create({
      message,
      ...toastOption[status],
      cssClass: 'my-toast',
    });

    toast.present();
  }
}
