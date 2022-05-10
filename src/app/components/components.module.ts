import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TaskCardComponent],
  exports: [TaskCardComponent],
  imports: [IonicModule, CommonModule],
})
export class ComponentsModule {}
