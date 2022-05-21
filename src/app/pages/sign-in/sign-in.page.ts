import { Component, OnInit } from '@angular/core';

import { AuthService } from '~/services/auth/auth.service';
import { ToastService } from '~/services/toast/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email = '';
  password = '';

  constructor(private authService: AuthService, private toastService: ToastService) {}

  ngOnInit() {}

  async onEmailSignIn(): Promise<void> {
    const emailSignIn = {
      email: this.email,
      password: this.password,
    };

    try {
      await this.authService.emailSignUp(emailSignIn);
      await this.toastService.presentToast('サインインしました', 'success');
      await this.initForm();
    } catch (error) {
      this.toastService.presentToast(error.message, 'error');
    }
  }

  async onGoogleSignIn(): Promise<void> {
    try {
      await this.authService.googleSignIn();
      await this.toastService.presentToast('サインインしました', 'success');
    } catch (error) {
      this.toastService.presentToast(error.message, 'error');
    }
  }

  private initForm() {
    this.email = '';
    this.password = '';
  }
}
