import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CalenderHeatmapComponentModule } from '~/components/calendar-heatmap/calendar-heatmap.module';
import { ProfileComponentModule } from '~/components/profile/profile.module';
import { SharedComponentsModule } from '~/components/shared/shared-components.module';

import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    ProfilePageRoutingModule,
    ProfileComponentModule,
    CalenderHeatmapComponentModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
