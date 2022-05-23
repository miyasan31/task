import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TaskModalComponentModule } from '~/components/task-modal/task-modal.module';
import { TaskSkeletonComponentComponentModule } from '~/components/task-skeleton/task-skeleton.module';

import { TaskPage } from './task.page';
import { TaskPageRoutingModule } from './task-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    TaskModalComponentModule,
    TaskSkeletonComponentComponentModule,
  ],
  declarations: [TaskPage],
})
export class TaskPageModule {}
