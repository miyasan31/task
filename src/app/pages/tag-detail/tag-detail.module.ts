import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedComponentsModule } from '~/components/shared/shared-components.module';

import { TagDetailPage } from './tag-detail.page';
import { TagDetailPageRoutingModule } from './tag-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagDetailPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [TagDetailPage],
})
export class TagDetailPageModule {}
