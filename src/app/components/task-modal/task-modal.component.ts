import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { TagModalComponent } from '~/components/tag-modal/tag-modal.component';
import { ITag } from '~/interfaces/tag/ITag';
import { ITask } from '~/interfaces/task/ITask';
import { AuthService } from '~/services/auth/auth.service';
import { TagService } from '~/services/tag/tag.service';
import { TaskService } from '~/services/task/task.service';
import { ToastService } from '~/services/toast/toast.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  @Input() taskId?: ITask['id'];
  @Input() isEdit: boolean;

  tagList: ITag[];

  taskName: ITask['taskName'] = '';
  description: ITask['description'] = '';
  isDone: ITask['isDone'] = false;
  likeCount: ITask['likeCount'] = 0;
  tagId: ITask['tagId'] = '';
  createdAt: ITask['createdAt'];

  selectTag: ITag | null = null;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private tagService: TagService,
    private toastService: ToastService,
    private modalController: ModalController,
  ) {}

  async ngOnInit() {
    const user = await this.authService.getAuthUser();
    this.tagList = await this.tagService.getTagList(user.uid).pipe(first()).toPromise(Promise);

    if (this.tagList.length === 0) {
      this.toastService.presentToast('タグが登録されていません', 'warning');
    }

    if (!this.taskId) {
      return;
    }

    const task = await this.taskService.get(this.taskId);
    this.taskName = task.taskName;
    this.description = task.description;
    this.isDone = task.isDone;
    this.likeCount = task.likeCount;
    this.tagId = task.tagId;
    this.createdAt = task.createdAt;
    this.selectTag = this.tagList.find((tag) => tag.id === this.tagId);
  }

  async onUpsertTask(): Promise<void> {
    // TODO:グローバルステートから参照する
    const user = await this.authService.getAuthUser();

    const upsertTask = {
      id: this.taskId,
      taskName: this.taskName.trim(),
      description: this.description.trim(),
      isDone: !!this.isDone,
      likeCount: this.likeCount,
      userId: user.uid,
      tagId: this.selectTag.id,
      createdAt: this.createdAt,
    };

    try {
      if (this.isEdit) {
        await this.taskService.update(upsertTask);
      } else {
        await this.taskService.create(upsertTask);
      }

      this.onModalDismiss();
      this.toastService.presentToast(`タスクを${this.isEdit ? '更新' : '作成'}しました`, 'success');
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }

  async onDeleteTask(taskId: ITask['id']): Promise<void> {
    try {
      await this.taskService.delete(taskId);
      this.toastService.presentToast('タスクを削除しました', 'success');
      this.onModalDismiss();
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }

  async onPresentTagModal($event): Promise<void> {
    $event.stopPropagation();
    $event.preventDefault();

    const modal = await this.modalController.create({
      component: TagModalComponent,
      canDismiss: true,
      initialBreakpoint: 0.35,
      breakpoints: [0, 0.35],
    });

    modal.onDidDismiss().then((res: { data?: ITag }) => {
      if (!res.data) {
        return;
      }
      this.selectTag = res.data;
    });

    return await modal.present();
  }

  onModalDismiss(): void {
    this.modalController.dismiss();
  }

  trackByFn(_, item: ITag): string {
    return item.id;
  }
}
