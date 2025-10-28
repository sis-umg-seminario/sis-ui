import { useRoutes, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import About from './pages/About';
import NotFound from './pages/NotFound';
import CourseAssignment from './pages/CourseAssignment';
import EnrollmentPage from './pages/Enrollment';
import CourseSchedulePage from './pages/CourseSchedulePage';
import ProgramCourses from './pages/ProgramCourses';
import Balance from './pages/Balance';

const AppRoutes = () => {
  
  const routes = useRoutes([
    { path: '/', element: <Home />},
    { path: '/home', element: <Home />},
    { path: '/about', element: <About />},
    { path: '/course-assignment', element: <CourseAssignment />},
    { path: '/enrollment', element: <EnrollmentPage />},
    { path: '/course-schedule', element: <CourseSchedulePage />},
    { path: '/program-courses', element: <ProgramCourses />},
    { path: '/balance', element: <Balance />},
    { path: '*', element: <NotFound />},
  ])
  return routes;
}

export default function App() {
  return (
    
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    
  );
}
