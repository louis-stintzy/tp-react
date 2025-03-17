import { NavLink } from 'react-router-dom';
import logo from '../../../../assets/logo.png';

import './Navbar.css';
import { useAuth } from '../../../../store/hooks/useAuth';

function Navbar() {
  const { isAuthenticated } = useAuth();
  const navLinks = [
    { title: 'Accueil', path: '/home' },
    { title: 'Films', path: '/movies' },
    {
      title: isAuthenticated ? 'Ajouter' : 'Connexion',
      path: isAuthenticated ? '/add-movie' : '/login',
    },
    {
      title: isAuthenticated ? 'Déconnexion' : 'Inscription',
      path: isAuthenticated ? '/logout' : '/register',
    },
  ];
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-content">
          {/* Nav Logo */}
          <div className="nav-logo">
            <img src={logo} alt="logo" />
          </div>
          {/* Nav Links */}
          <ul className="nav-links">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <NavLink to={link.path} className="nav-link">
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
