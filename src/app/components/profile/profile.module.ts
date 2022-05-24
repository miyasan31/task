import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProfileComponentModule {}
