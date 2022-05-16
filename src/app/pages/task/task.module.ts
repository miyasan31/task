import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';
import { TaskPage } from './task.page';
import { ComponentsModule } from '~/pages/task/components/task-modal/task-modal.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TaskPageRoutingModule, ComponentsModule],
  declarations: [TaskPage],
})
export class TaskPageModule {}
