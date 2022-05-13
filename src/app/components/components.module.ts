import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskCardComponent } from './task-card/task-card.component';

@NgModule({
  declarations: [TaskCardComponent, TaskModalComponent],
  exports: [TaskCardComponent, TaskModalComponent],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ComponentsModule {}
