import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { colorPicker } from '~/constants/colorPicker';
import { ICreateTag, ITag } from '~/interfaces/tag/ITag';
import { AuthService } from '~/services/auth/auth.service';
import { TagService } from '~/services/tag/tag.service';
import { ToastService } from '~/services/toast/toast.service';

const initialTag: ICreateTag = { tagName: '', color: 'pink', userId: '' };

@Component({
  selector: 'app-tag-edit-page',
  templateUrl: './tag-edit.page.html',
  styleUrls: ['./tag-edit.page.scss'],
})
export class TagEditPage implements OnInit {
  userId: string;
  tagList: ITag[];
  isVisible = true;

  createTag: ICreateTag | null = null;

  constructor(
    private authService: AuthService,
    private tagService: TagService,
    private toastService: ToastService,
    private pickerController: PickerController,
  ) {}

  async ngOnInit() {
    const user = await this.authService.getAuthUser();
    this.userId = user.uid;
    this.tagList = await this.tagService.getTagList(user.uid).pipe(first()).toPromise(Promise);
    this.tagListLengthCheck();
  }

  onAddTag(): void {
    this.createTag = { ...initialTag, userId: this.userId };
  }

  onChangeTagName($event): void {
    this.createTag.tagName = $event.detail.value.trim();
  }

  async onCreateTag(): Promise<void> {
    if (!this.createTag.color) {
      return;
    }
    if (!this.createTag.tagName.trim()) {
      return;
    }

    try {
      const tagId = await this.tagService.create(this.createTag);
      this.toastService.presentToast('タグを作成しました', 'success');
      this.tagList = [{ ...this.createTag, id: tagId, isActive: true }, ...this.tagList];
      this.createTag = null;
      this.tagListLengthCheck();
      return;
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }

  async onInactiveTag(currentTag: ITag): Promise<void> {
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

  private async updateTagColor(index: number, updateTag: ITag): Promise<void> {
    try {
      await this.tagService.update(updateTag);
      this.toastService.presentToast('タグの色を変更しました', 'success');
      this.tagList[index] = updateTag;
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }

  async onPresentPicker(index?: number): Promise<void> {
    const picker = await this.pickerController.create({
      buttons: [
        { text: 'キャンセル', role: 'cancel' },
        {
          text: '確定',
          handler: (selected) => {
            if (index === undefined) {
              // 追加
              this.createTag.color = selected.colorPicker.value;
              this.onCreateTag();
              return;
            }
            // 更新
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
