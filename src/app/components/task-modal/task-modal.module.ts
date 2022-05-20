import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TagModalComponentModule } from '~/components/tag-modal/tag-modal.module';

import { TaskModalComponent } from './task-modal.component';

@NgModule({
  declarations: [TaskModalComponent],
  exports: [TaskModalComponent],

  imports: [IonicModule, CommonModule, FormsModule, TagModalComponentModule],
})
export class TaskModalComponentModule {}
