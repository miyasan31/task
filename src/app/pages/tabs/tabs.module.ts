import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedComponentsModule } from '~/components/shared/shared-components.module';

import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule, SharedComponentsModule],
  declarations: [TabsPage],
})
export class TabsPageModule {}
