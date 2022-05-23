import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { TaskSkeletonComponent } from './task-skeleton.component';

@NgModule({
  declarations: [TaskSkeletonComponent],
  exports: [TaskSkeletonComponent],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class TaskSkeletonComponentComponentModule {}
