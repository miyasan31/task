import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
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

  constructor(
    private authService: AuthService,
    private tagService: TagService,
    private modalController: ModalController,
    private pickerController: PickerController,
  ) {}

  async ngOnInit() {
    const user = await this.authService.getAuthUser();
    this.userId = user.uid;
    this.tagList = await this.tagService.getTagList(user.uid);
  }

  onAddTag(): void {
    if (this.tagList.length === 10) return;
    this.tagList = [{ ...initialTag, userId: this.userId }, ...this.tagList];
  }

  onChangeTagName(index: number, $event): void {
    this.tagList[index].tagName = $event.detail.value;
  }

  async onCreateTag(index: number): Promise<void> {
    const createTag = this.tagList[index];

    if (!createTag.color) return;
    if (!createTag.tagName) return;

    if (createTag.id) {
      await this.tagService.update(createTag);
    } else {
      const tagId = await this.tagService.create(createTag);
      this.tagList[index].id = tagId;
    }
  }

  async onInactiveTag(tag: ITag): Promise<void> {
    const updateTag = { ...tag, isActive: false };
    await this.tagService.update(updateTag);
    this.tagList = this.tagList.filter((tag) => tag.id !== updateTag.id);
  }

  async onPresentPicker(index: number, currentValue: string): Promise<void> {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
        },
        {
          text: '確定',
          handler: (selected) => {
            this.tagList[index].color = selected.colorPicker.value;
            this.onCreateTag(index);
          },
        },
      ],
      columns: [
        {
          name: 'colorPicker',
          options: colorPicker,
          prevSelected: colorPicker.findIndex((color) => color.text === currentValue),
        },
      ],
    });
    await picker.present();
  }

  onModalDismiss(): void {
    this.modalController.dismiss();
  }
}
