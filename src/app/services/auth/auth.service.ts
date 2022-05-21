import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { Capacitor } from '@capacitor/core';
import { AlertController, NavController } from '@ionic/angular';

import { IUser } from '~/interfaces/user/IUser';
import { ToastService } from '~/services/toast/toast.service';
import { UserService } from '~/services/user/user.service';

import { firebaseError } from './firebase.error';

type RedirectPath = '/signin' | '/register' | '/task';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private toastService: ToastService,
    private userService: UserService,
    private navController: NavController,
    private alertController: AlertController,
  ) {}

  // Google
  async googleSignIn(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await this.nativeGoogleSignIn();
      return;
    }

    await this.webGoogleSignIn();
  }

  private async nativeGoogleSignIn(): Promise<void> {
    try {
      // TODO:capacitorを使ってGoogleサインインを実装
      const session = await signInWithPopup(this.auth, new GoogleAuthProvider());
      await this.signedInCheckUserInfo(session.user.uid);
    } catch (error) {
      console.error(error.message);
      throw new Error('サインインに失敗しました');
    }
  }

  private async webGoogleSignIn(): Promise<void> {
    try {
      const session = await signInWithPopup(this.auth, new GoogleAuthProvider());
      await this.signedInCheckUserInfo(session.user.uid);
    } catch (error) {
      console.error(error.message);
      throw new Error('サインインに失敗しました');
    }
  }

  async emailSignUp(data: { email: string; password: string }): Promise<void> {
    if (!data.email) {
      throw new Error('メールアドレスを入力してください');
    }

    if (!data.password) {
      throw new Error('パスワードを入力してください');
    }

    try {
      const session = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
      await this.signedInCheckUserInfo(session.user.uid);
    } catch (error) {
      await this.emailSignIn(data);
    }
  }

  async emailSignIn(data: { email: string; password: string }): Promise<void> {
    try {
      const session = await signInWithEmailAndPassword(this.auth, data.email, data.password);
      await this.signedInCheckUserInfo(session.user.uid);
    } catch (error) {
      const errorMessage = this.alertError(error);
      throw new Error(errorMessage);
    }
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
    this.navigatePath('/signin', { isRoot: true });
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

  navigatePath(path: RedirectPath, options?: { isRoot: boolean }): void {
    if (options && options.isRoot) {
      this.navController.navigateRoot(path);
      return;
    }
    this.navController.navigateForward(path);
  }

  private alertError(e): string {
    if (firebaseError.hasOwnProperty(e.code)) {
      e = firebaseError[e.code];
    } else {
      e.message = 'サインインに失敗しました';
    }

    return e.message;
  }
}
