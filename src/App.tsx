import { useRoutes, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

const AppRoutes = () => {
  
  const routes = useRoutes([
    { path: '/', element: <Home />},
    { path: '/home', element: <Home />},
    { path: '/about', element: <About />},
    { path: '*', element: <NotFound />},
  ])
  return routes;
}

export default function App() {
  return (
    
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    
  );
}
