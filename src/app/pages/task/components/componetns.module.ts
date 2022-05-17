import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TaskModalComponent } from '~/pages/task/components/task-modal/task-modal.component';
import { TagModalComponent } from '~/pages/task/components/tag-modal/tag-modal.component';

@NgModule({
  declarations: [TaskModalComponent, TagModalComponent],
  exports: [TaskModalComponent, TagModalComponent],

  imports: [IonicModule, CommonModule, FormsModule],
})
export class ComponentsModule {}
