import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { colorPicker } from '~/constants/colorPicker';
import { ITag } from '~/interfaces/tag/ITag';
import { AuthService } from '~/services/auth/auth.service';
import { TagService } from '~/services/tag/tag.service';

const initialTag: ITag = { id: '', tagName: '', color: '', isActive: true, userId: '' };

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.scss'],
})
export class TagModalComponent implements OnInit {
  userId: string;
  tagList: ITag[];
  isVisible = true;

  createTag: ITag | null = null;

  constructor(
    private authService: AuthService,
    private tagService: TagService,
    private modalController: ModalController,
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
    this.createTag.tagName = $event.detail.value;
  }

  async onCreateTag(): Promise<void> {
    if (!this.createTag.color) {
      return;
    }
    if (!this.createTag.tagName) {
      return;
    }

    const tagId = await this.tagService.create(this.createTag);

    this.tagList = [{ ...this.createTag, id: tagId }, ...this.tagList];
    this.createTag = null;
    this.tagListLengthCheck();
    return;
  }

  async onInactiveTag(tag: ITag): Promise<void> {
    const updateTag = { ...tag, isActive: false };
    await this.tagService.update(updateTag);
    this.tagList = this.tagList.filter((tag) => tag.id !== updateTag.id);
    this.tagListLengthCheck();
  }

  private async updateTagColor(index: number, updateTag: ITag): Promise<void> {
    await this.tagService.update(updateTag);
    this.tagList[index] = updateTag;
    return;
  }

  async onPresentPicker(index?: number): Promise<void> {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
        },
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
      columns: [
        {
          name: 'colorPicker',
          options: colorPicker,
        },
      ],
    });
    await picker.present();
  }

  private tagListLengthCheck() {
    if (this.tagList.length === 10) {
      this.isVisible = false;
      return;
    }
    this.isVisible = true;
  }

  onModalDismiss(): void {
    this.modalController.dismiss();
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
