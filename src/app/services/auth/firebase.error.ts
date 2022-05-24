export const firebaseError = {
  'auth/invalid-email': {
    code: 'invalid-email',
    message: 'メールアドレスのフォーマットが間違っています',
  },
  'auth/wrong-password': {
    code: 'wrong-password',
    message: '入力いただいたパスワードが間違っています',
  },
  'auth/weak-password': {
    code: 'weak-password',
    message: 'パスワードは最低でも６文字以上のものをご利用ください',
  },
  'auth/user-not-found': {
    code: 'user-not-found',
    message: '入力いただいたユーザーは存在しません',
  },
  'auth/email-already-in-use': {
    code: 'email-already-in-use',
    message: 'このメールアドレスを利用したユーザーが既に存在します',
  },
};
