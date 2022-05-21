import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { TaskModalComponent } from '~/components/task-modal/task-modal.component';
import { ITask } from '~/interfaces/task/ITask';
import { AuthService } from '~/services/auth/auth.service';
import { TaskService } from '~/services/task/task.service';
import { ToastService } from '~/services/toast/toast.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  taskList: Observable<ITask[]>;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private toastService: ToastService,
    private modalController: ModalController,
  ) {}

  async ngOnInit() {
    // TODO:グローバルステートからuidを参照する
    const uid = await (await this.authService.getAuthUser()).uid;
    this.taskList = this.taskService.getTaskList(uid);
  }

  async onReversingTaskCompletion($event, task: ITask): Promise<void> {
    $event.preventDefault();
    $event.stopPropagation();

    const updatedTask = {
      ...task,
      isDone: !task.isDone,
    };

    try {
      await this.taskService.update(updatedTask);
      this.toastService.presentToast(`タスクを${task.isDone ? '完了' : '未完了'}にしました`);
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message);
    }
  }

  onDeleteTask(taskId: ITask['id']): void {
    try {
      this.taskService.delete(taskId);
      this.toastService.presentToast('タスクを削除しました');
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message);
    }
  }

  async onPresentTaskModal(task?: ITask): Promise<void> {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: {
        taskId: task?.id,
        isEdit: !!task,
      },
    });

    return await modal.present();
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
