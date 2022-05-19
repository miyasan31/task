import { Component, OnInit } from '@angular/core';

import { AuthService } from '~/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
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
