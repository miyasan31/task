import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TaskCardComponent } from './task-card/task-card.component';
import { TaskDetailCardComponent } from './task-detail-card/task-detail-card.component';

@NgModule({
  declarations: [TaskCardComponent, TaskDetailCardComponent],
  exports: [TaskCardComponent, TaskDetailCardComponent],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ComponentsModule {}
