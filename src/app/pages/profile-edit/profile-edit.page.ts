import { Component, OnInit } from '@angular/core';

import { IUser } from '~/interfaces/user/IUser';
import { AuthService } from '~/services/auth/auth.service';
import { RouterService } from '~/services/router/router.service';
import { ToastService } from '~/services/toast/toast.service';
import { UserService } from '~/services/user/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  userInfo: IUser = {
    id: '',
    userName: '',
    email: '',
    profile: '',
    avatar: '',
    createdAt: null,
    updatedAt: null,
  };
  file: File;
  filePreview: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService,
    private routerService: RouterService,
  ) {}

  async ngOnInit() {
    const user = await this.authService.getAuthUserInfo();

    if (!user) {
      this.authService.signOut();
    }

    this.userInfo = user;
  }

  onFileSelected($event): void {
    const file: File = $event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.file = file;
  }

  async onUserUpdate(): Promise<void> {
    try {
      await this.userService.update(this.userInfo, this.file);
      this.toastService.presentToast('プロフィールを更新しました', 'success');
      this.routerService.navigateBack('my-profile/setting');
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }
}
