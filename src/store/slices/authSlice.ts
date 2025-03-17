import { StateCreator } from 'zustand';
import {
  LoginCredentials,
  RegisterCredentials,
  UserData,
} from '../../@types/auth';
import { FooterMessageData } from '../../@types/form';
import { AuthService } from '../../services/auth';

const authService = new AuthService();

export interface AuthState {
  isLoadingAuth: boolean;
  isAuthenticated: boolean;
  user: UserData | null;
  message: FooterMessageData | null;
}

export interface AuthActions {
  register: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  resetMessage: () => void;
}

export interface AuthSlice extends AuthState, AuthActions {}

export const initialState: AuthState = {
  isLoadingAuth: false,
  isAuthenticated: false,
  user: null,
  message: null,
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  ...initialState,
  register: async (credentials) => {
    set({ isLoadingAuth: true });
    try {
      const user = await authService.register(credentials);
      set({
        isLoadingAuth: false,
        isAuthenticated: true,
        user: user,
      });
    } catch (error) {
      set({
        isLoadingAuth: false,
        message: {
          type: 'error',
          text: (error as Error).message,
        },
      });
    }
  },
  login: async (credentials) => {
    set({ isLoadingAuth: true });
    try {
      const user = await authService.login(credentials);
      set({
        isLoadingAuth: false,
        isAuthenticated: true,
        user,
      });
    } catch (error) {
      set({
        isLoadingAuth: false,
        message: {
          type: 'error',
          text: (error as Error).message,
        },
      });
    }
  },
  logout: () => {
    authService.logout();
    set({ isAuthenticated: false, user: null });
  },
  resetMessage: () => set({ message: null }),
});
