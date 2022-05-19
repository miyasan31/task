import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '~/components/components.module';

import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule, ComponentsModule],
  declarations: [TabsPage],
})
export class TabsPageModule {}
