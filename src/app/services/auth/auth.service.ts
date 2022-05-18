import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';

import { firebaseError } from './firebase.error';
import { Capacitor } from '@capacitor/core';
import { IUser } from '~/interfaces/user/IUser';
import { UserService } from '~/services/user/user.service';

type RedirectPath = '/signin' | '/register' | '/task';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private userService: UserService,
    private navController: NavController,
    private alertController: AlertController,
  ) {}

  // Google
  googleSignIn(): void {
    if (Capacitor.isNativePlatform()) {
      this.nativeGoogleSignIn();
      return;
    }
    this.webGoogleSignIn();
  }

  private nativeGoogleSignIn(): void {
    // TODO:capacitorを使ってGoogleサインインを実装
    signInWithPopup(this.auth, new GoogleAuthProvider()).then(async (session) => {
      await this.signedInCheckUserInfo(session.user.uid);
    });
  }

  private webGoogleSignIn(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then(async (session) => {
      await this.signedInCheckUserInfo(session.user.uid);
    });
  }

  // Email
  emailSignUp(data: { email: string; password: string }): void {
    createUserWithEmailAndPassword(this.auth, data.email, data.password).then(async (session) => {
      await this.signedInCheckUserInfo(session.user.uid);
    });
  }

  emailSignIn(data: { email: string; password: string }): void {
    signInWithEmailAndPassword(this.auth, data.email, data.password).then(async (session) => {
      await this.signedInCheckUserInfo(session.user.uid);
    });
  }

  signOut(): void {
    signOut(this.auth).then(() => {
      this.navigatePath('/signin', { isSignOut: true });
    });
  }

  // 認証済のユーザーIDを取得する
  async getAuthUser(): Promise<User> {
    return await this.auth.currentUser;
  }

  // 認証済のユーザー情報を取得する
  async getAuthUserInfo(): Promise<IUser> {
    const authUser = await this.getAuthUser();
    return await this.userService.get(authUser.uid);
  }

  private async signedInCheckUserInfo(userId: IUser['id']): Promise<void> {
    // 認証後、データベースにユーザー情報が存在するか確認
    const userResult = await this.userService.get(userId);

    // 存在しなかったらユーザー登録画面に遷移
    if (!userResult) {
      this.navigatePath('/register');
      return;
    }

    // 存在したらメイン画面に遷移
    this.navigatePath('/task');
  }

  navigatePath(path: RedirectPath, optisons?: { isSignOut: boolean }): void {
    if (optisons.isSignOut) {
      this.navController.navigateRoot(path);
      return;
    }

    this.navController.navigateForward(path).catch((error) => {
      console.log(error.message);
      this.alertError(error);
      throw error;
    });
  }

  private async alertError(e): Promise<void> {
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
