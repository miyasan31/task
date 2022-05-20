import { Component, OnInit } from '@angular/core';

import { AuthService } from '~/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email = '';
  password = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  onEmailSignIn(): void {
    const emailSignIn = {
      email: this.email,
      password: this.password,
    };

    this.auth.emailSignUp(emailSignIn);
  }

  onGoogleSignIn(): void {
    this.auth.googleSignIn();
  }

  private initForm() {
    this.email = '';
    this.password = '';
  }
}
