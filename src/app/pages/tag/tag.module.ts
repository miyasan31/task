import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TagPage } from './tag.page';
import { TagPageRoutingModule } from './tag-routing.module';

@NgModule({
  declarations: [TagPage],
  exports: [TagPage],

  imports: [IonicModule, CommonModule, FormsModule, TagPageRoutingModule],
})
export class TagPageModule {}
