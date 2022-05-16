import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TaskModalComponent } from '~/components/task-modal/task-modal.component';
import { ITask } from '~/interfaces/task/ITask';
import { AuthService } from '~/services/auth/auth.service';
import { TaskService } from '~/services/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  taskList: Observable<ITask[]>;

  constructor(
    public authService: AuthService,
    public taskService: TaskService,
    public modalController: ModalController,
  ) {}

  async ngOnInit() {
    // TODO:グローバルステートからuidを参照する
    const uid = await (await this.authService.getAuthUser()).uid;
    this.taskList = this.taskService.getTaskList(uid);
  }

  async onReversingTaskCompletion($event, task: ITask) {
    $event.stopPropagation();
    $event.preventDefault();

    const updatedTask = {
      ...task,
      isDone: !task.isDone,
    };

    this.taskService.update(updatedTask);
  }

  async onPresentModal(taskId?: ITask['id']) {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: {
        taskId: taskId,
        isEdit: !!taskId,
      },
    });
    return await modal.present();
  }
}
