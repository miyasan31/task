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

  constructor(public authService: AuthService, public userService: UserService) {}

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

  async onUserRegister() {
    const userDto = {
      id: this.id,
      userName: this.userName,
      email: this.email,
      profile: '',
      avatar: this.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.userService.createUser(userDto);

    this.authService.navigatePath('/task');
  }
}