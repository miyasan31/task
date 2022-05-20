import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TagModalComponent } from './tag-modal.component';

@NgModule({
  declarations: [TagModalComponent],
  exports: [TagModalComponent],

  imports: [IonicModule, CommonModule, FormsModule],
})
export class TagModalComponentModule {}
