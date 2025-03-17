import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home/Home';
export const routerConfig = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
];
export const router = createBrowserRouter(routerConfig);
