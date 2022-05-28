import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TagRegisterPage } from './tag-register.page';
import { TagRegisterPageRoutingModule } from './tag-register-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, TagRegisterPageRoutingModule],
  declarations: [TagRegisterPage],
})
export class TagRegisterPageModule {}
