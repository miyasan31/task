import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ProfileEditPage } from './profile-edit.page';
import { ProfileEditPageRoutingModule } from './profile-edit-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, ProfileEditPageRoutingModule],
  declarations: [ProfileEditPage],
})
export class ProfileEditPageModule {}
