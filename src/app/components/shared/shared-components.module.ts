import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TaskCardComponent } from '~/components/shared/task-card/task-card.component';
import { TaskCardSkeletonComponent } from '~/components/shared/task-card-skeleton/task-card-skeleton.component';
import { TaskDetailCardComponent } from '~/components/shared/task-detail-card/task-detail-card.component';

@NgModule({
  declarations: [TaskCardComponent, TaskDetailCardComponent, TaskCardSkeletonComponent],
  exports: [TaskCardComponent, TaskDetailCardComponent, TaskCardSkeletonComponent],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class SharedComponentsModule {}
