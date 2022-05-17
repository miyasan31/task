import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { colorPicker, colorPallet } from '~/constants/colorPicker';

type ColorScheme = typeof colorPallet[number]['name'];

type TagForm = {
  name: string;
  color: ColorScheme | '';
};

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.scss'],
})
export class TagModalComponent implements OnInit {
  userTagList: TagForm[] = [];

  constructor(
    private modalController: ModalController,
    private pickerController: PickerController,
  ) {
    this.userTagList = [
      { name: 'React', color: 'gray' },
      { name: 'Svelte', color: 'tomato' },
      { name: 'Vue', color: 'pink' },
      { name: 'Angular', color: 'sky' },
    ];
  }

  ngOnInit() {}

  onCreateTag(): void {
    if (this.userTagList.length === 10) return;

    this.userTagList = [{ name: '', color: '' }, ...this.userTagList];
  }

  onChangeTagName(index: number, $event): void {
    this.userTagList[index]['name'] = $event.detail.value;
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
            console.info(selected);
            this.userTagList[index]['color'] = selected.colorPicker.value;
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
