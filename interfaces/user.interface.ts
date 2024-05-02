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