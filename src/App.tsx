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

const AppRoutes = () => {
  
  const routes = useRoutes([
    { path: '/', element: <Home />},
    { path: '/home', element: <Home />},
    { path: '/about', element: <About />},
    //Academic
    { path: '/course-assignment', element: <CourseAssignment />},
    { path: '/program-courses', element: <ProgramCourses />},
    //Enrollments
    { path: '/enrollment', element: <Enrollment />},
    //Students
    { path: '/course-schedule', element: <CourseSchedule />},
    { path: '/grades', element: <Grades />},
    //payments
    { path: '/balance', element: <Balance />},
    //Professor
    { path: '/assigned-courses', element: <AssignedCourses />},
    { path: '/assigned-courses/:id', element: <AssignedCourse />},
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
