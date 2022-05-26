import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TagEditPage } from './tag-edit.page';
import { TagEditPageRoutingModule } from './tag-edit-routing.module';

@NgModule({
  declarations: [TagEditPage],
  exports: [TagEditPage],

  imports: [IonicModule, CommonModule, FormsModule, TagEditPageRoutingModule],
})
export class TagEditPageModule {}
