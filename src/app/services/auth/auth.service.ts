import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';

import { firebaseError } from './firebase.error';
import { Capacitor } from '@capacitor/core';
import { UserRepository } from '~/repositories/user/user.repository';
import { IUser } from '~/interfaces/IUser';

type RedirectPath = '/signin' | '/signin/register' | '/task';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public auth: Auth,
    public userRepository: UserRepository,
    public navController: NavController,
    public alertController: AlertController,
  ) {}

  // 認証済のユーザーIDを取得する
  async getAuthUserId(): Promise<string> {
    const user = await this.auth.currentUser;
    return user.uid;
  }

  // 認証済のユーザー情報を取得する
  async getAuthUserInfo(): Promise<IUser> {
    const authUserId = await this.getAuthUserId();
    return await this.userRepository.getUser(authUserId);
  }

  googleSignIn() {
    if (Capacitor.isNativePlatform()) {
      console.info('native google sign in');
      return this.nativeGoogleSignIn();
    } else {
      console.info('web google sign in');
      return this.webGoogleSignIn();
    }
  }

  nativeGoogleSignIn() {
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then(() => {
      this.navigatePath('/task');
    });
  }

  webGoogleSignIn() {
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then(() => {
      this.navigatePath('/task');
    });
  }

  emailSignUp(data: { email: string; password: string }) {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password).then(() => {
      this.navigatePath('/task');
    });
  }

  emailSignIn(data: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.auth, data.email, data.password).then(() => {
      this.navigatePath('/task');
    });
  }

  signOut() {
    return signOut(this.auth).then(() => {
      this.navigatePath('/signin');
    });
  }

  navigatePath(path: RedirectPath) {
    this.navController.navigateForward(path).catch((error) => {
      console.log(error.message);
      this.alertError(error);
      throw error;
    });
  }

  async alertError(e) {
    if (firebaseError.hasOwnProperty(e.code)) {
      e = firebaseError[e.code];
    }

    const alert = await this.alertController.create({
      header: e.code,
      message: e.message,
      buttons: ['閉じる'],
    });
    await alert.present();
  }
}
