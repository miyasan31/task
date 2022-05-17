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
  userTagList: ITag[];

  constructor(
    private authService: AuthService,
    private tagService: TagService,
    private modalController: ModalController,
    private pickerController: PickerController,
  ) {}

  async ngOnInit() {
    const user = await this.authService.getAuthUser();
    this.userId = user.uid;
    this.userTagList = await this.tagService.getTagList(user.uid);
  }

  onAddTag(): void {
    if (this.userTagList.length === 10) return;
    this.userTagList = [{ ...initialTag, userId: this.userId }, ...this.userTagList];
  }

  onChangeTagName(index: number, $event): void {
    this.userTagList[index].tagName = $event.detail.value;
  }

  async onCreateTag(index: number): Promise<void> {
    const createTag = this.userTagList[index];

    if (!createTag.color) return;
    if (!createTag.tagName) return;

    if (createTag.id) {
      await this.tagService.update(createTag);
    } else {
      const tagId = await this.tagService.create(createTag);
      this.userTagList[index].id = tagId;
    }
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
            this.userTagList[index].color = selected.colorPicker.value;
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
