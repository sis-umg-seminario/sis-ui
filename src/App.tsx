import { useRoutes, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import About from './pages/About';
import NotFound from './pages/NotFound';
import CourseAssignment from './pages/academic/CourseAssignment';
import Enrollment from './pages/enrollments/Enrollment';
import CourseSchedule from './pages/students/CourseSchedule';
import ProgramCourses from './pages/academic/ProgramCourses';
import Balance from './pages/payments/Balance';
import AssignedCourses from './pages/professor/AssignedCourses';
import AssignedCourse from './pages/professor/AssignedCourse';
import Grades from './pages/students/Grades';
import { useAuth } from './hooks/auth/useAuth';
import Login from './pages/auth/login';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    { path: '/login', element: <Login />},
    { path: '/', element: isAuthenticated ? <Home /> : <Login />},
    { path: '/home', element: isAuthenticated ? <Home /> : <Login />},
    { path: '/about', element: <About />},
    //Academic
    { path: '/course-assignment', element: isAuthenticated ? <CourseAssignment /> : <Login />},
    { path: '/program-courses', element: isAuthenticated ? <ProgramCourses /> : <Login />},
    //Enrollments
    { path: '/enrollment', element: isAuthenticated ? <Enrollment /> : <Login />},
    //Students
    { path: '/course-schedule', element: isAuthenticated ? <CourseSchedule /> : <Login />},
    { path: '/grades', element: isAuthenticated ? <Grades /> : <Login />},
    //payments
    { path: '/balance', element: isAuthenticated ? <Balance /> : <Login />},
    //Professor
    { path: '/assigned-courses', element: isAuthenticated ? <AssignedCourses /> : <Login />},
    { path: '/assigned-courses/:id', element: isAuthenticated ? <AssignedCourse /> : <Login />},
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
