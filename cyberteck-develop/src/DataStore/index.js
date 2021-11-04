import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import AuthReducer from './AuthReducer';
import CourseReducer from './CourseReducer';
import CourseScheduleReducer from "./CourseScheduleReducer";
import BlogReducer from './BlogReducer';
import SchoolReducer from "./SchoolReducer"
import SchoolCourseReducer from './SchoolCoursesReducer';
const store = configureStore({
    reducer: {
        auth: AuthReducer,
        course: CourseReducer,
        blog: BlogReducer,
        courseSchedule: CourseScheduleReducer,
        school: SchoolReducer,
        schoolCourses: SchoolCourseReducer
    },
    middleware: [
        ...getDefaultMiddleware(),
    ]
});

export default store
