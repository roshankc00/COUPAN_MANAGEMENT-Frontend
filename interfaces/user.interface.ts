export interface IUserSignup {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  phoneNumber: string | null;
  role: string;
  isActive: boolean;
}

export interface IResetPassword {
  newPassword: string;
  token: string;
}
export interface IChangePasswordBody {
  newPassword: string;
  oldPassword: string;
  email: string;
}
