import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TagModalComponent } from './tag-modal.component';

@NgModule({
  declarations: [TagModalComponent],
  exports: [TagModalComponent],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TagModalComponentModule {}
