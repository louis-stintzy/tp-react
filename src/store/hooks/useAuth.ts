import useStore from '../store';

export const useAuth = () => {
  return {
    isLoading: useStore((state) => state.isLoadingAuth),
    isAuthenticated: useStore((state) => state.isAuthenticated),
    user: useStore((state) => state.user),
    message: useStore((state) => state.message),
    register: useStore((state) => state.register),
    login: useStore((state) => state.login),
    logout: useStore((state) => state.logout),
    resetMessage: useStore((state) => state.resetMessage),
  };
};
