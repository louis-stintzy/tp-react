import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound/NotFound';
import AddMovie from './pages/AddMovie/AddMovie';
export const routerConfig = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'movies',
        element: <Movies />,
      },
      {
        path: 'add-movie',
        element: <AddMovie />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
export const router = createBrowserRouter(routerConfig);
