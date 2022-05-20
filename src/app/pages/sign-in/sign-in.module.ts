import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignInPage } from './sign-in.page';
import { SignInPageRoutingModule } from './sign-in-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SignInPageRoutingModule],
  declarations: [SignInPage],
})
export class SignInPageModule {}