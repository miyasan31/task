import { Component, OnInit } from '@angular/core';

import { AuthService } from '~/services/auth/auth.service';
import { ToastService } from '~/services/toast/toast.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private toastService: ToastService) {}

  ngOnInit() {}

  async onEmailSignUp(): Promise<void> {
    const emailSignIn = {
      email: this.email.trim(),
      password: this.password.trim(),
      confirmPassword: this.confirmPassword.trim(),
    };

    try {
      await this.authService.emailSignUp(emailSignIn);
      await this.initForm();
      await this.toastService.presentToast('サインアップしました', 'success');
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }

  async onGoogleSignIn(): Promise<void> {
    try {
      await this.authService.googleSignIn();
      await this.toastService.presentToast('サインアップしました', 'success');
    } catch (error) {
      console.error(error.message);
      this.toastService.presentToast(error.message, 'error');
    }
  }

  private initForm(): void {
    this.email = '';
    this.password = '';
  }
}
