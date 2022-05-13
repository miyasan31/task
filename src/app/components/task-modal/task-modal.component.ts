import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITask } from '~/interfaces/ITask';
import { AuthService } from '~/services/auth/auth.service';
import { TaskService } from '~/services/task/task.service';

const tag_list = [
  { id: 'aaaaa', tagName: '読書' },
  { id: 'bbbbb', tagName: '筋トレ' },
  { id: 'ccccc', tagName: '開発' },
  { id: 'ddddd', tagName: 'ランニング' },
];

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  @Input() taskId?: ITask['id'];
  @Input() isEdit: boolean;

  tag_list = tag_list;

  taskName: ITask['taskName'];
  description: ITask['description'];
  isDone: ITask['isDone'];
  tagId: ITask['tagId'];

  constructor(
    public modalController: ModalController,
    public authService: AuthService,
    public taskService: TaskService,
  ) {}

  ngOnInit() {}

  async onCreateTask() {
    // TODO:グローバルステートから参照する
    const uid = await (await this.authService.getAuthUser()).uid;

    const task = {
      id: this.taskId,
      taskName: this.taskName,
      description: this.description,
      isDone: this.isDone,
      userId: uid,
      tagId: this.tagId,
    };

    await this.taskService.createTask(task);

    this.onModalDismiss();
  }

  onModalDismiss() {
    this.modalController.dismiss();
  }
}
