import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { TaskCreatePage } from '~/pages/task-create/task-create.page';

const dummy_data = [
  {
    id: 1,
    taskName: 'Task 1',
  },
  {
    id: 2,
    taskName: 'Task 2',
  },
  {
    id: 3,
    taskName: 'Task 3',
  },
];

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  taskList = dummy_data;

  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  onClickEvent($event) {
    $event.stopPropagation();
    $event.preventDefault();
  }

  async onPresentModal(taskId?: number) {
    const modal = await this.modalController.create({
      component: TaskCreatePage,
      componentProps: {
        taskId: taskId,
        isEdit: !!taskId,
      },
    });
    return await modal.present();
  }
}
