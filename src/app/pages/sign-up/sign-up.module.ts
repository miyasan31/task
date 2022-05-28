import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BrandLogoComponentModule } from '~/components/brand-logo/shared-components.module';

import { SignUpPage } from './sign-up.page';
import { SignUpPageRoutingModule } from './sign-up-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    BrandLogoComponentModule,
  ],
  declarations: [SignUpPage],
})
export class SignUpPageModule {}
