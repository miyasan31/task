import { Component, OnInit } from '@angular/core';

import { AuthService } from '~/services/auth/auth.service';
import { UserService } from '~/services/user/user.service';

@Component({
  selector: 'app-register',
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

  constructor(private authService: AuthService, private userService: UserService) {}

  async ngOnInit() {
    const userInfo = await this.authService.getAuthUser();

    if (!userInfo) {
      this.authService.signOut();
      this.authService.navigatePath('/signin', { isRoot: true });
      return;
    }

    this.id = userInfo.uid;
    this.userName = userInfo.displayName;
    this.email = userInfo.email;
    this.avatar = userInfo.photoURL;
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

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
      userName: this.userName,
      email: this.email,
      avatar: this.avatar,
    };

    await this.userService.create(createUser, this.file);

    this.authService.navigatePath('/task');
  }
}
