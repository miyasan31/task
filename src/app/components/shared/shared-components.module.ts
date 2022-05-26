import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LineClampComponent } from '~/components/line-clamp/line-clamp.component';
import { TaskCardComponent } from '~/components/shared/task-card/task-card.component';
import { TaskCardSkeletonComponent } from '~/components/shared/task-card-skeleton/task-card-skeleton.component';
import { TaskDetailCardComponent } from '~/components/shared/task-detail-card/task-detail-card.component';
import { TaskDetailCardSkeletonComponent } from '~/components/shared/task-detail-card-skeleton/task-detail-card-skeleton.component';

@NgModule({
  declarations: [
    TaskCardComponent,
    TaskDetailCardComponent,
    TaskCardSkeletonComponent,
    TaskDetailCardSkeletonComponent,
    LineClampComponent,
  ],
  exports: [
    TaskCardComponent,
    TaskDetailCardComponent,
    TaskCardSkeletonComponent,
    TaskDetailCardSkeletonComponent,
  ],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class SharedComponentsModule {}
