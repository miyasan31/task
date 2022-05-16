import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TaskModalComponent } from './task-modal.component';

@NgModule({
  declarations: [TaskModalComponent],
  exports: [TaskModalComponent],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ComponentsModule {}
