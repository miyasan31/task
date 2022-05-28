import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrandLogoComponent } from '~/components/brand-logo/brand-logo.component';

@NgModule({
  declarations: [BrandLogoComponent],
  exports: [BrandLogoComponent],
  imports: [CommonModule],
})
export class BrandLogoComponentModule {}
