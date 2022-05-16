import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}

  onGoogleSignIn(): void {
    this.auth.googleSignIn();
  }
}
