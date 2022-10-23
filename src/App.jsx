import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CharacterPage from './pages/CharacterPage';
import './assets/css/style.css';
import CharacterDetail from './pages/CharacterDetail';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/character',
    element: <CharacterPage />,
  },
  {
    path: '/character/:id',
    element: <CharacterDetail />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
