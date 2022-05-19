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

  constructor(private authService: AuthService, private userService: UserService) {}

  async ngOnInit() {
    const userInfo = await this.authService.getAuthUser();

    if (!userInfo) {
      this.authService.signOut();
      this.authService.navigatePath('/signin');
      return;
    }

    this.id = userInfo.uid;
    this.userName = userInfo.displayName;
    this.email = userInfo.email;
    this.avatar = userInfo.photoURL;
  }

  async onUserRegister(): Promise<void> {
    const createUser = {
      id: this.id,
      userName: this.userName,
      email: this.email,
      avatar: this.avatar,
    };

    await this.userService.create(createUser);

    this.authService.navigatePath('/task');
  }
}
