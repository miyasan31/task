import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfileSkeletonComponent } from './profile-skeleton.component';

@NgModule({
  declarations: [ProfileSkeletonComponent],
  exports: [ProfileSkeletonComponent],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProfileSkeletonComponentModule {}
