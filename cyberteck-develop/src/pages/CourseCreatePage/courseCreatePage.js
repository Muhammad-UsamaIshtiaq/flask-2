import Layout from "../Layout";
import "./courseCreatePage.css"
import {
    HeaderBox, HeaderTitle, PageBlock, PrimaryText,
} from "./../../features/Atoms"
import {
    Grid,
} from "@material-ui/core";
import coverImg from "./../../images/minecraft-animation.jpg";

import CourseForm from "./Block/CourseForm"
import { useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux'
import { loadCourse, clearStoreState } from "./../../DataStore/CourseReducer"
import { useEffect, useRef, useState } from "react";
import Data from "../../Data";

function CourseCreatePage(props) {
    const { courseId } = useParams();
    const prevRef = useRef();
    const loadCourseData = useSelector(state => state.course &&
        state.course.loadCourse && state.course.loadCourse.data || {});
    const [mounted, setMounted] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!mounted || prevRef.current !== courseId) {
            dispatch(clearStoreState())
            if (courseId) {
                dispatch(loadCourse(courseId))
            }
            setMounted(true)
        }
        prevRef.current = courseId;
    }, [courseId])

    return (
        <Layout fillHeader className="detailsBlock" style={{ background: '#f6f7f7' }}>
            {
                loadCourseData && loadCourseData.title &&
                <HeaderBox style={{ paddingTop: '35%', }} coverPic={coverImg}>
                    <HeaderTitle>
                        {loadCourseData.title}<br />
                        <b style={{ background: '#73d56e' }}>
                            {Data.Config.get(Data.Config.CourseType, loadCourseData.courseType, 'displayName')}
                        </b>
                    </HeaderTitle>
                </HeaderBox>
            }
            <PageBlock style={{ paddingTop: '7%', paddingBottom: '7%' }}>
                <Grid item xs={12}><PrimaryText>{courseId ? 'Update' : 'Create'}&nbsp;
                    <b className="greenTextBackground">Course</b><br /></PrimaryText></Grid>
                <Grid item xs={12}>
                    <CourseForm courseInfo={loadCourseData} />
                </Grid>
            </PageBlock>
        </Layout>
    );
}

export default CourseCreatePage;


