import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, PickerController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { colorPicker } from '~/constants/colorPicker';
import { ICreateTag, ITag } from '~/interfaces/tag/ITag';
import { AuthService } from '~/services/auth/auth.service';
import { TagService } from '~/services/tag/tag.service';
import { ToastService } from '~/services/toast/toast.service';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag.page.html',
  styleUrls: ['./tag.page.scss'],
})
export class TagPage implements OnInit {
  userId: string;
  tagList: ITag[];
  isVisible = true;

  createTag = '';

  constructor(
    private authService: AuthService,
    private tagService: TagService,
    private toastService: ToastService,
    private pickerController: PickerController,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
  ) {}

  async ngOnInit() {
    const user = await this.authService.getAuthUser();
    this.userId = user.uid;
    this.tagList = await this.tagService.getTagList(user.uid).pipe(first()).toPromise(Promise);
    this.tagListLengthCheck();
  }

  async onCreateTag(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'タグ作成',
      inputs: [
        {
          name: 'tag',
          placeholder: 'タグ名を入力してください',
          value: '',
        },
      ],
      buttons: [
        { text: '閉じる' },
        {
          text: '作成する',
          handler: async (data) => {
            const usedTagColor = this.tagList.map((t) => t.color);
            const randomColor = colorPicker.filter((t) => !usedTagColor.includes(t.value))[0].value;
            const createTag = {
              tagName: data.tag,
              color: randomColor,
              isActive: true,
              userId: this.userId,
            };
            const tagId = await this.tagService.create(createTag);
            this.toastService.presentToast('タグを作成しました', 'success');
            this.tagList = [...this.tagList, { ...createTag, id: tagId }];
          },
        },
      ],
    });

    await alert.present();
  }

  async onPresentActionSheet(tag: ITag, index: number): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: 'タグ編集',
      buttons: [
        {
          text: '削除する',
          role: 'destructive',
          icon: 'trash',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            this.onInactiveTag(tag);
          },
        },
        // {
        //   text: 'タグ名変更',
        //   icon: 'pencil',
        //   data: 10,
        //   handler: () => {
        //     console.log('Share clicked');
        //   },
        // },
        {
          text: 'カラー変更',
          icon: 'color-palette',
          handler: async () => {
            await actionSheet.dismiss();
            await this.onPresentPicker(index);
          },
        },
        {
          text: 'キャンセル',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });

    await actionSheet.present();
  }

  private async onInactiveTag(currentTag: ITag): Promise<void> {
    const updateTag = {
      ...currentTag,
      isActive: false,
    };

    try {
      await this.tagService.update(updateTag);
      this.toastService.presentToast('タグを削除しました', 'success');
      this.tagList = this.tagList.filter((tag) => tag.id !== updateTag.id);
      this.tagListLengthCheck();
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }

  async onPresentPicker(index: number): Promise<void> {
    const picker = await this.pickerController.create({
      buttons: [
        { text: 'キャンセル', role: 'cancel' },
        {
          text: '確定',
          handler: (selected) => {
            const updateTag = {
              ...this.tagList[index],
              color: selected.colorPicker.value,
            };
            this.updateTagColor(index, updateTag);
          },
        },
      ],
      columns: [{ name: 'colorPicker', options: colorPicker }],
    });

    await picker.present();
  }

  private async updateTagColor(index: number, updateTag: ITag): Promise<void> {
    try {
      await this.tagService.update(updateTag);
      this.toastService.presentToast('タグカラーを変更しました', 'success');
      this.tagList[index] = updateTag;
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }

  private tagListLengthCheck(): boolean {
    if (this.tagList.length === 10) {
      this.isVisible = false;
      return;
    }
    this.isVisible = true;
  }

  trackByFn(_, item: ITag): string {
    return item.id;
  }
}
