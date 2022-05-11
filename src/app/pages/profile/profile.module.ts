import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '~/components/components.module';
import { ExploreContainerComponentModule } from '~/pages/explore-container/explore-container.module';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ExploreContainerComponentModule,
    ComponentsModule,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
