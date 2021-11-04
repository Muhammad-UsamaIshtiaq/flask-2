import './App.css';
import HomePage from './pages/HomePage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import DashboardPage from "./pages/DashboardPage"
import CourseCreatePage from "./pages/CourseCreatePage"
import CourseListingPage from "./pages/CourseListingPage";
import BlogCreatePage from './pages/BlogPage'
import BlogListingPage from './pages/BlogPage/blogListPage';
import BlogDetailPage from './pages/BlogPage/blogDetailPage';
import FaqPage from './pages/FaqPage/faqPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./features/Authentication/PrivateRoute"
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import CourseBookingPage from './pages/CourseBookingPage';
import TeacherPage from './pages/TeacherPage';
import ContactUsPage from './pages/ContactUsPage';
import TermsConditionPage from './pages/TermsConditionPage';
import ComputerCoursePage from './pages/ComputerCoursePage';
import TechCampCoursePage from './pages/TechCampCoursePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ComingSoonPage from './pages/ComingSoonPage';
import AboutUsPage from './pages/AboutUsPage';
import SchoolCreatePage from './pages/SchoolCreatePage';
import SchoolDetailsPage from './pages/SchoolDetailsPage';
import SchoolListingPage from './pages/SchoolListingPage';
import SchoolListingPage2 from './pages/SchoolListingPage2';
import VirtualComputerCourse from './pages/VirtualComputerCourse/VirtualComputerCourse';



function App() {
  return (
    <div className="App">
        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path="/blog/view/:blogId" component={BlogDetailPage} />
            <Route exact path="/faq" component={FaqPage} />
            <Route exact path="/teacher" component={TeacherPage} />
            <Route exact path="/contactus" component={ContactUsPage} />
            <Route exact path="/computer-course" component={ComputerCoursePage} />
            <Route exact path="/techcamp-course" component={TechCampCoursePage} />
            <PrivateRoute exact path="/blog/create" authType="TEACHER" component={BlogCreatePage} />
            <PrivateRoute exact path="/blog/edit/:blogId" authType="TEACHER" component={BlogCreatePage} />
            <Route exact path="/blog" component={BlogListingPage} />
            <PrivateRoute exact path="/dashboard" component={DashboardPage} />

            <Route exact path="/termsConditionPage" component={TermsConditionPage} />
            <Route exact path="/privacypolicy" component={PrivacyPolicyPage} />
            <Route exact path="/coming-soon" component={ComingSoonPage} />
            <Route exact path="/about-us" component={AboutUsPage} />

            <PrivateRoute exact path="/courses/create" authType="TEACHER" component={CourseCreatePage} />
            <Route exact path="/courses/:courseId/:title" component={CourseDetailsPage} />
            <PrivateRoute exact path="/courses/:courseId/:title/edit" authType="TEACHER" component={CourseCreatePage} />
            <PrivateRoute exact path="/courses/:courseId/:title/book" component={CourseBookingPage} />
            <Route exact path="/courses" component={CourseListingPage} />

            <PrivateRoute exact path="/schools/create" authType="REPRESENTATIVE" component={SchoolCreatePage} />
            <PrivateRoute exact path="/schools/:schoolId/:title/edit" authType="REPRESENTATIVE" component={SchoolCreatePage} />
            <Route exact path="/schools/:schoolId/:title" component={SchoolDetailsPage} />
            <Route exact path="/schools-list" component={SchoolListingPage} />
            <Route exact path="/schools" component={SchoolListingPage2} />
            <Route exact path="/virtualcourses" component={VirtualComputerCourse} />

            <Route exact path="/" component={HomePage} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
