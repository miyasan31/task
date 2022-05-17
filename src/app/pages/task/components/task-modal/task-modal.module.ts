import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TaskModalComponent } from './task-modal.component';
import { TagModalComponentModule } from '~/pages/task/components/tag-modal/tag-modal.module';

@NgModule({
  declarations: [TaskModalComponent],
  exports: [TaskModalComponent],
  imports: [IonicModule, CommonModule, FormsModule, TagModalComponentModule],
})
export class ComponentsModule {}
