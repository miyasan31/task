import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '~/components/components.module';
import { CalenderHeatmapComponentModule } from '~/pages/profile/components/calendar-heatmap.module';

import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ComponentsModule,
    CalenderHeatmapComponentModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
