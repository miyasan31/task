import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '~/pages/explore-container/explore-container.module';

import { TaskPageRoutingModule } from './task-routing.module';
import { TaskPage } from './task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskPageRoutingModule,
    ExploreContainerComponentModule,
  ],
  declarations: [TaskPage],
})
export class TaskPageModule {}
