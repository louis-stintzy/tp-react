export interface RegisterCredentials {
  nickname: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  nickname: string;
  email: string;
  password: string;
  isLogged: boolean;
}
