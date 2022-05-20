import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { TagModalComponent } from '~/components/tag-modal/tag-modal.component';
import { ITag } from '~/interfaces/tag/ITag';
import { ITask } from '~/interfaces/task/ITask';
import { AuthService } from '~/services/auth/auth.service';
import { TagService } from '~/services/tag/tag.service';
import { TaskService } from '~/services/task/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  @Input() taskId?: ITask['id'];
  @Input() isEdit: boolean;

  tagList: Observable<ITag[]>;

  taskName: ITask['taskName'];
  description: ITask['description'];
  isDone: ITask['isDone'];
  likeCount: ITask['likeCount'];
  tagId: ITask['tagId'];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private tagService: TagService,
    private modalController: ModalController,
  ) {}

  async ngOnInit() {
    const user = await this.authService.getAuthUser();
    this.tagList = await this.tagService.getTagList(user.uid);

    if (!this.taskId) {
      return;
    }

    const task = await this.taskService.get(this.taskId);
    this.taskName = task.taskName;
    this.description = task.description;
    this.isDone = task.isDone;
    this.tagId = task.tagId;
    this.likeCount = task.likeCount;
  }

  async onUpsertTask(): Promise<void> {
    // TODO:グローバルステートから参照する
    const user = await this.authService.getAuthUser();

    const task = {
      id: this.taskId,
      taskName: this.taskName,
      description: this.description,
      isDone: this.isDone,
      likeCount: this.likeCount,
      userId: user.uid,
      tagId: this.tagId,
    };

    if (this.isEdit) {
      await this.taskService.update(task);
    } else {
      await this.taskService.create(task);
    }

    this.onModalDismiss();
  }

  async onDeleteTask(taskId: ITask['id']): Promise<void> {
    await this.taskService.delete(taskId);
    this.onModalDismiss();
  }

  async onPresentTagModal($event): Promise<void> {
    $event.stopPropagation();
    $event.preventDefault();

    const modal = await this.modalController.create({
      component: TagModalComponent,
      canDismiss: true,
      presentingElement: await this.modalController.getTop(),
    });

    return await modal.present();
  }

  onModalDismiss(): void {
    this.modalController.dismiss();
  }

  trackByFn(index, item): number {
    return item.id;
  }
}
