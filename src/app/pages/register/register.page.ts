import { Component, OnInit } from '@angular/core';

import { AuthService } from '~/services/auth/auth.service';
import { RouterService } from '~/services/router/router.service';
import { ToastService } from '~/services/toast/toast.service';
import { UserService } from '~/services/user/user.service';

const dummyAvatar =
  // eslint-disable-next-line max-len
  'https://firebasestorage.googleapis.com/v0/b/task-6fa6f.appspot.com/o/dummy%2Fonepiece01_luffy2.png?alt=media&token=65baee2d-0955-490d-ada1-be36687fe21e';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  id: string;
  userName: string;
  email: string;
  avatar: string;
  file: File;
  filePreview: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService,
    private routerService: RouterService,
  ) {}

  async ngOnInit() {
    const userInfo = await this.authService.getAuthUser();

    if (!userInfo) {
      this.authService.signOut();
    }

    this.id = userInfo.uid;
    this.userName = userInfo.displayName || '';
    this.email = userInfo.email;
    this.avatar = userInfo.photoURL || dummyAvatar;
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

  async onUserRegister(): Promise<void> {
    const createUser = {
      id: this.id,
      userName: this.userName.trim(),
      email: this.email,
      avatar: this.avatar,
    };

    try {
      await this.userService.create(createUser, this.file);
      await this.toastService.presentToast('ユーザー登録が完了しました', 'success');
      this.routerService.navigatePath('/tag-register');
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }
}
