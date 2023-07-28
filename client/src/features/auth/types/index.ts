export type TLogin = {
  email: string;
  password: string;
  remember: boolean;
};

export type TRegister = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  remember: boolean;
};
