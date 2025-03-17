import {
  LoginCredentials,
  RegisterCredentials,
  UserData,
} from '../@types/auth';

export class AuthService {
  _getUsers(): UserData[] | [] {
    const users = localStorage.getItem('users');
    return users ? (JSON.parse(users) as UserData[]) : [];
  }

  _saveUsers(users: UserData[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  /**
   * Enregistre un nouvel utilisateur.
   *
   * @param {string} nickname - Le surnom de l'utilisateur.
   * @param {string} email - L'adresse email de l'utilisateur.
   * @param {string} password - Le mot de passe de l'utilisateur.
   * @returns {Promise<Object>} Une promesse qui résout l'objet utilisateur enregistré.
   */
  register(data: RegisterCredentials): Promise<UserData> {
    const { nickname, email, password } = data;
    return new Promise((resolve, reject) => {
      try {
        const users: UserData[] = this._getUsers();
        if (users.some((user) => user.email === email)) {
          throw new Error('Email already exists');
        }

        const user = {
          id: Date.now().toString(),
          nickname,
          email,
          password,
          isLogged: true,
        } as UserData;

        users.push(user);
        this._saveUsers(users);
        localStorage.setItem('currentUser', JSON.stringify(user));

        resolve(user);
      } catch (error) {
        reject(
          new Error(error instanceof Error ? error.message : String(error))
        );
      }
    });
  }

  /**
   * Authentifie un utilisateur existant.
   *
   * @param {string} email - L'adresse email de l'utilisateur.
   * @param {string} password - Le mot de passe de l'utilisateur.
   * @returns {Promise<Object>} Une promesse qui résout l'objet utilisateur authentifié.
   */
  login(data: LoginCredentials): Promise<UserData> {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
      try {
        const users = this._getUsers();
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          throw new Error('Invalid credentials');
        }

        user.isLogged = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._saveUsers(users);

        resolve(user);
      } catch (error) {
        reject(
          new Error(error instanceof Error ? error.message : String(error))
        );
      }
    });
  }

  /**
   * Déconnecte l'utilisateur courant.
   * Met à jour l'état de l'utilisateur dans le localStorage et supprime l'utilisateur connecté.
   */
  logout() {
    const users = this._getUsers();
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    if (currentUser) {
      const currentUserParsed = JSON.parse(currentUser) as UserData;
      const index = users.findIndex((u) => u.id === currentUserParsed.id);
      if (index !== -1) {
        users[index].isLogged = false;
      }
      this._saveUsers(users);
    }
    localStorage.removeItem('currentUser');
  }

  /**
   * Vérifie si un utilisateur est actuellement authentifié.
   *
   * @returns {boolean} True si un utilisateur est connecté, sinon false.
   */
  isAuthenticated() {
    return !!localStorage.getItem('currentUser');
  }

  /**
   * Récupère l'utilisateur actuellement connecté.
   *
   * @returns {Object|null} L'objet utilisateur connecté ou null s'il n'y a aucun utilisateur connecté.
   */
  static getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? (JSON.parse(user) as UserData) : null;
  }
}
