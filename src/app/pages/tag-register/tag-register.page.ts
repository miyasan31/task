import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { tagSample } from '~/constants/tagSample';
import { ITag } from '~/interfaces/tag/ITag';
import { AuthService } from '~/services/auth/auth.service';
import { RouterService } from '~/services/router/router.service';
import { TagService } from '~/services/tag/tag.service';
import { ToastService } from '~/services/toast/toast.service';

@Component({
  selector: 'app-tag-register-page',
  templateUrl: './tag-register.page.html',
  styleUrls: ['./tag-register.page.scss'],
})
export class TagRegisterPage implements OnInit {
  tagSample = tagSample;
  selectTag: string[] = [];

  constructor(
    private authService: AuthService,
    private tagService: TagService,
    private routerService: RouterService,
    private toastService: ToastService,
    private alertController: AlertController,
  ) {}

  async ngOnInit() {}

  onSelectTagName(index: number): void {
    if (this.selectTag.includes(this.tagSample[index])) {
      this.selectTag.splice(this.selectTag.indexOf(this.tagSample[index]), 1);
      return;
    }

    if (this.selectTag.length > 9) {
      return;
    }
    this.selectTag = [...this.selectTag, tagSample[index]];
  }

  async onCreateTag(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'タグ名入力',
      inputs: [
        {
          name: 'tag',
          placeholder: '',
          value: '',
        },
      ],
      buttons: [
        { text: 'キャンセル' },
        {
          text: '作成する',
          handler: async (data) => {
            this.tagSample = [...this.tagSample, data.tag];
            this.selectTag = [...this.selectTag, data.tag];
          },
        },
      ],
    });

    await alert.present();
  }

  async onCreateTagList(): Promise<void> {
    try {
      const user = await this.authService.getAuthUser();
      await this.tagService.createTagList(user.uid, this.selectTag);
      this.toastService.presentToast('タグ登録が完了しました', 'success');
      this.routerService.navigatePath('/task');
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }

  trackByFn(_, item: ITag): string {
    return item.id;
  }
}
