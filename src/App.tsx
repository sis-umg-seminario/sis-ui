import { useRoutes, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import About from './pages/About';
import NotFound from './pages/NotFound';
import CourseAssignment from './pages/academic/CourseAssignment';
import Enrollment from './pages/enrollments/Enrollment';
import CourseSchedule from './pages/students/CourseSchedule';
import ProgramCourses from './pages/academic/ProgramCourses';
import AssignedCourses from './pages/professor/AssignedCourses';
import AssignedCourse from './pages/professor/AssignedCourse';
import Grades from './pages/students/Grades';
import AccountStatementPage from './pages/students/AccountStatementPage';
import { useAuth } from './hooks/auth/useAuth';
import Login from './pages/auth/login';

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  const routes = [];

  routes.push(
    { path: '/login', element: <Login />},
    { path: '/about', element: <About />},
  );
  
  if (user?.roles.includes('student')) {
    routes.push(
      { path: '/', element: isAuthenticated ? <Home /> : <Login />},
      { path: '/home', element: isAuthenticated ? <Home /> : <Login />},
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
      { path: '/account-statement', element: isAuthenticated ? <AccountStatementPage /> : <Login />},
    );
  }

  if (user?.roles.includes('professor')) {
    routes.push(
      { path: '/', element: isAuthenticated ? <AssignedCourses /> : <Login />},
      { path: '/home', element: isAuthenticated ? <AssignedCourses /> : <Login />},
      //Professor
      { path: '/assigned-courses', element: isAuthenticated ? <AssignedCourses /> : <Login />},
      { path: '/assigned-courses/:id', element: isAuthenticated ? <AssignedCourse /> : <Login />},
    );
  }

  routes.push(
    { path: '*', element: isAuthenticated ? <NotFound /> : <Login /> },
  );

  const router = useRoutes(routes)
  return router;
}

export default function App() {
  return (
    
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    
  );
}
