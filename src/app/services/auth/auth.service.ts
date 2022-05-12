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
import { IUser } from '~/interfaces/IUser';
import { UserService } from '~/services/user/user.service';

type RedirectPath = '/signin' | '/register' | '/task';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public auth: Auth,
    public userService: UserService,
    public navController: NavController,
    public alertController: AlertController,
  ) {}

  // Google
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
    // TODO:capacitorを使ってGoogleサインインを実装
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then(async (session) => {
      await this.signedInCheckUserInfo(session.user.uid);
    });
  }

  webGoogleSignIn() {
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then(async (session) => {
      await this.signedInCheckUserInfo(session.user.uid);
    });
  }

  // Email
  emailSignUp(data: { email: string; password: string }) {
    return createUserWithEmailAndPassword(this.auth, data.email, data.password).then(
      async (session) => {
        await this.signedInCheckUserInfo(session.user.uid);
      },
    );
  }

  emailSignIn(data: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.auth, data.email, data.password).then(
      async (session) => {
        await this.signedInCheckUserInfo(session.user.uid);
      },
    );
  }

  signOut() {
    return signOut(this.auth).then(() => {
      this.navigatePath('/signin');
    });
  }

  // 認証済のユーザーIDを取得する
  async getAuthUser(): Promise<User> {
    return await this.auth.currentUser;
  }

  // 認証済のユーザー情報を取得する
  async getAuthUserInfo(): Promise<IUser> {
    const authUser = await this.getAuthUser();
    return await this.userService.getUser(authUser.uid);
  }

  async signedInCheckUserInfo(userId: IUser['id']) {
    // 認証後、データベースにユーザー情報が存在するか確認
    const userResult = await this.userService.getUser(userId);

    // 存在しなかったらユーザー登録画面に遷移
    if (!userResult) {
      this.navigatePath('/register');
      return;
    }

    // 存在したらメイン画面に遷移
    this.navigatePath('/task');
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
