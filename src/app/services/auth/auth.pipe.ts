import { Injectable } from '@angular/core';

import { IEmailSign, IEmailSignConfirm } from '~/interfaces/auth/IAuthEmail';

@Injectable({
  providedIn: 'root',
})
export class AuthPipe {
  constructor() {}

  signIn(authEmail: IEmailSign): IEmailSign | Error {
    if (!authEmail.email) {
      return new Error('メールアドレスを入力してください');
    }

    if (!authEmail.password) {
      return new Error('パスワードを入力してください');
    }

    return authEmail;
  }

  signUp(authEmail: IEmailSignConfirm): IEmailSign | Error {
    if (!authEmail.email) {
      return new Error('メールアドレスを入力してください');
    }

    if (!authEmail.password) {
      return new Error('パスワードを入力してください');
    }

    if (!authEmail.confirmPassword) {
      return new Error('パスワードを入力してください');
    }

    if (authEmail.password !== authEmail.confirmPassword) {
      return new Error('パスワードと確認用パスワードが一致しません');
    }

    return authEmail;
  }
}
