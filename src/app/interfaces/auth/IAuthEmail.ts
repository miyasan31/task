export interface IEmailSign {
  email: string;
  password: string;
}

export interface IEmailSignConfirm extends IEmailSign {
  confirmPassword: string;
}
