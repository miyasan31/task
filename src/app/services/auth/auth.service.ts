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

import { IEmailSign, IEmailSignConfirm } from '~/interfaces/auth/IAuthEmail';
import { IUser } from '~/interfaces/user/IUser';
import { AuthPipe } from '~/services/auth/auth.pipe';
import { RouterService } from '~/services/router/router.service';
import { UserService } from '~/services/user/user.service';
import { isError } from '~/utils/isError';

import { firebaseError } from './firebase.error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private authPipe: AuthPipe,
    private userService: UserService,
    private routerService: RouterService,
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

  async emailSignUp(data: IEmailSignConfirm): Promise<void> {
    const emailData = this.authPipe.signUp(data);

    if (isError(emailData)) {
      throw new Error(emailData.message);
    }

    try {
      const session = await createUserWithEmailAndPassword(
        this.auth,
        emailData.email,
        emailData.password,
      );
      await this.signedInCheckUserInfo(session.user.uid);
    } catch (error) {
      const errorMessage = this.alertError(error);
      throw new Error(errorMessage);
    }
  }

  async emailSignIn(data: IEmailSign): Promise<void> {
    const emailData = this.authPipe.signIn(data);

    if (isError(emailData)) {
      throw new Error(emailData.message);
    }

    try {
      const session = await signInWithEmailAndPassword(
        this.auth,
        emailData.email,
        emailData.password,
      );
      await this.signedInCheckUserInfo(session.user.uid);
    } catch (error) {
      const errorMessage = this.alertError(error);
      throw new Error(errorMessage);
    }
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
    this.routerService.navigatePath('/signin', { isRoot: true });
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
      this.routerService.navigatePath('/register');
      return;
    }

    // 存在したらメイン画面に遷移
    this.routerService.navigatePath('/task');
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
