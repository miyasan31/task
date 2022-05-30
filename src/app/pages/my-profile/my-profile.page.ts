import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { TaskModalComponent } from '~/components/task-modal/task-modal.component';
import { ILikedTaskCard } from '~/interfaces/profile/ILikedTaskCard';
import { ITagChart } from '~/interfaces/profile/ITagChart';
import { ITask, IUpsertTask } from '~/interfaces/task/ITask';
import { ITaskCard } from '~/interfaces/timeline/ITaskCard';
import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { ProfileService } from '~/services/profile/profile.service';
import { RouterService } from '~/services/router/router.service';
import { TaskService } from '~/services/task/task.service';
import { ToastService } from '~/services/toast/toast.service';
import { sleep } from '~/utils/sleep';

type Scene = 'profile' | 'task' | 'like';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  taskList: Observable<ITaskCard[]>;
  likeList: Observable<ILikedTaskCard[]>;
  isDoneTaskCount = 0;
  likeCount = 0;
  scene: Scene = 'profile';
  user: IUser | null = null;
  tagChart: ITagChart[];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private profileService: ProfileService,
    private routerService: RouterService,
    private toastService: ToastService,
    private modalController: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
  ) {}

  ngOnInit() {
    this.fetchProfile();
  }

  private fetchProfile(): void {
    this.fetchUserProfile(400);
  }

  private async fetchUserProfile(delay: number): Promise<void> {
    const [user] = await Promise.all([this.authService.getAuthUserInfo(), sleep(delay)]);
    this.user = user;

    const [isDoneTaskCount, likeCount, tagChart] = await Promise.all([
      this.profileService.getUserIsDoneTaskCount(this.user.id),
      this.profileService.getUserLikeCount(this.user.id),
      this.profileService.getTagChartData(this.user.id),
    ]);
    this.isDoneTaskCount = isDoneTaskCount;
    this.likeCount = likeCount;
    this.tagChart = tagChart;
  }

  private fetchTaskList(): void {
    setTimeout(() => {
      this.taskList = this.profileService.getUserTaskListWithLike(this.user.id, this.user.id);
    }, 300);
  }

  private fetchLikeList(): void {
    setTimeout(() => {
      this.likeList = this.profileService.getUserLikedTaskList(this.user.id, this.user.id);
    }, 300);
  }

  async onProfileRefresh($event): Promise<void> {
    await this.fetchUserProfile(600);
    await $event.target.complete();
  }

  onSegmentChanged($event): void {
    const scene = $event.detail.value;
    switch (scene) {
      case 'profile':
        if (this.user) {
          break;
        }
        this.fetchProfile();
        break;
      case 'task':
        if (this.taskList) {
          break;
        }
        this.fetchTaskList();
        break;
      case 'like':
        if (this.likeList) {
          break;
        }
        this.fetchLikeList();
        break;
      default:
        break;
    }
  }

  async onPresentActionSheet(task: IUpsertTask): Promise<void> {
    if (!task) {
      return;
    }
    if (task.userId !== this.user.id) {
      return;
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: '削除する',
          role: 'destructive',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            this.onDeleteTask(task.id);
          },
        },
        {
          text: '編集する',
          handler: async () => {
            await actionSheet.dismiss();
            await this.presentTaskModal(task);
          },
        },
        {
          text: 'キャンセル',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async presentTaskModal(task?: ITask): Promise<void> {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: {
        taskId: task?.id,
        isEdit: !!task,
        isAfterEdit: true,
      },
    });

    return await modal.present();
  }

  async onDeleteTask(taskId: ITask['id']): Promise<void> {
    const alert = await this.alertController.create({
      message: '本当に削除しますか？このタスクに付けられたいいねも同時に削除されます。',
      buttons: [
        { text: 'キャンセル', role: 'cancel' },
        {
          text: '削除する',
          role: 'destructive',
          handler: async () => {
            try {
              await this.taskService.delete(taskId);
              await this.toastService.presentToast('タスクを削除しました', 'success');
            } catch (error) {
              console.error(error.message);
              this.toastService.presentToast(error.message, 'error');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  navigatePush($event, path?: string): void {
    this.routerService.navigatePush($event, path);
  }

  trackByFnTaskList(_, item: ITaskCard): string {
    return item.task?.id;
  }

  trackByFnLikeList(_, item: ILikedTaskCard): string {
    return item.like?.id;
  }
}
