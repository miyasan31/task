import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TagModalComponent } from '~/pages/task/components/tag-modal/tag-modal.component';
import { TaskModalComponent } from '~/pages/task/components/task-modal/task-modal.component';

@NgModule({
  declarations: [TaskModalComponent, TagModalComponent],
  exports: [TaskModalComponent, TagModalComponent],

  imports: [IonicModule, CommonModule, FormsModule],
})
export class ComponentsModule {}
