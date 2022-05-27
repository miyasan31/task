import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagRegisterPageRoutingModule } from './tag-register-routing.module';

import { TagRegisterPage } from './tag-register.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TagRegisterPageRoutingModule],
  declarations: [TagRegisterPage],
})
export class TagRegisterPageModule {}
