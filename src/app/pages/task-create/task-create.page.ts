import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.page.html',
  styleUrls: ['./task-create.page.scss'],
})
export class TaskCreatePage implements OnInit {
  @Input() taskId?: number;
  @Input() isEdit: boolean;

  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  onModalDismiss() {
    this.modalController.dismiss();
  }
}
