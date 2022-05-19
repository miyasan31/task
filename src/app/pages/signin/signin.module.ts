import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SigninPage } from './signin.page';
import { SigninPageRoutingModule } from './signin-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SigninPageRoutingModule],
  declarations: [SigninPage],
})
export class SigninPageModule {}
