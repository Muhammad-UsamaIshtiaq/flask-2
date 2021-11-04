import Layout from "../Layout";
import "./courseDetailsPage.css"
import {
    HeaderBox, HeaderTitle
} from "./../../features/Atoms"
import {

} from "@material-ui/core";
import CourseHighlightBlock from "./Blocks/CourseHighlightBlock"
import EliteTeachersBlock from "./Blocks/EliteTeachersBlock"
import CoursePointsBlock from "./Blocks/CoursePointsBlock"
import CourseRequirementsBlock from "./Blocks/CourseRequirementsBlock"
import coverImg from "./../../images/minecraft-animation.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loadCourse } from "./../../DataStore/CourseReducer"
import { useEffect, useState } from "react";
import Data from "../../Data";
import Api from "../../Api";

export default function CourseDetailsPage(props) {
    const { courseId } = useParams();
    const courseDetails = useSelector(state => state.course.loadCourse && state.course.loadCourse.data || {})
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (!mounted && courseId) {
            dispatch(loadCourse(courseId));
            setMounted(true)
        }
    }, [])

    return (
        <Layout className="detailsBlock">
            {
                courseDetails &&
                <HeaderBox style={{ paddingTop: '35%', }}
                    coverPic={courseDetails.coverImage && Api.Media.getImage(courseDetails.coverImage)}>
                    <HeaderTitle>
                        {courseDetails.title}<br />
                        <b style={{ background: '#73d56e' }}>
                            {Data.Config.get(Data.Config.CourseType, courseDetails.courseType, 'displayName')}
                        </b>
                    </HeaderTitle>
                </HeaderBox>
            }
            <CourseHighlightBlock courseInfo={courseDetails} />
            {
                courseDetails &&
                courseDetails.courseType != 'AT_SCHOOL_LOCATION' &&
                <CourseRequirementsBlock courseInfo={courseDetails} />
            }
            <CoursePointsBlock courseInfo={courseDetails} />
            <EliteTeachersBlock courseInfo={courseDetails} /> 
        </Layout>
    );
}



