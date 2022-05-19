import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '~/pages/task/components/componetns.module';

import { TaskPage } from './task.page';
import { TaskPageRoutingModule } from './task-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TaskPageRoutingModule, ComponentsModule],
  declarations: [TaskPage],
})
export class TaskPageModule {}
