import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

type RedirectPath = '/signin' | '/register' | '/timeline' | '/tag-register';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private navController: NavController) {}

  navigatePush($event, path?: string): void {
    $event.stopPropagation();
    $event.preventDefault();

    if (!path) {
      return;
    }
    this.navController.navigateForward(path);
  }

  navigateBack(path: string): void {
    this.navController.navigateBack(path);
  }

  navigatePath(path: RedirectPath, options?: { isRoot: boolean }): void {
    if (options && options.isRoot) {
      this.navController.navigateRoot(path);
      return;
    }
    this.navController.navigateForward(path);
  }
}
