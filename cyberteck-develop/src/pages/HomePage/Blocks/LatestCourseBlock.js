import {
    PrimaryButton, PageBlock, PrimaryText, BodyText, SecondaryText, CourseBlock
} from "./../../../features/Atoms"
import {
    Grid, Box
} from "@material-ui/core";
import course1 from "./../../../images/course1.JPG"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCourse } from "./../../../DataStore/CourseReducer"
import Data from "../../../Data";
import { Link } from "react-router-dom";
import Api from "../../../Api";


const LatestCourseBlock = () => {
    const courseListStatus = useSelector(state => state.course.loadAllCourse)
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (!mounted) {
            dispatch(loadAllCourse());
            setMounted(true)
        }
    }, [])

    return (
        <PageBlock>
            <Grid xs={12} item>
                <BodyText style={{ fontWeight: 600 }}>
                    JOIN CYBERTECK ACADEMY’S
                </BodyText>
                <PrimaryText className="marginGapBottom" >
                    Courses&nbsp;
                    <b className="greenText">We Offer</b>
                </PrimaryText>
                <BodyText >
                    Browse our selection of top tech building courses for all students K-8
                </BodyText>
            </Grid>
            {
                courseListStatus.status === 'FULFILLED' &&
                courseListStatus.data &&
                Object.values(Data.Config.Grade).map(grade =>
                    <>
                        <Grid xs={12} item disableGutter>
                            <SecondaryText className="greenText" style={{ fontSize: '28px' }}>
                                Grade {grade.displayName}
                            </SecondaryText>
                        </Grid>
                        <Grid xs={12} item>
                            <Box container spacing={5} component={Grid} style={{ padding: '0px 7%' }}>
                                {
                                    courseListStatus.data
                                        .filter(course => course.grade === grade.id)
                                        .slice(0, 6)
                                        .map(item =>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <CourseBlock
                                                    to={`/courses/${item.id}/${item.title.replaceAll(' ', '-')}`}
                                                    label={item.title}
                                                    grade={Data.Config.get(Data.Config.Grade, item.grade, 'displayName')}
                                                    courseType={Data.Config.get(Data.Config.CourseType, item.courseType, 'displayName')}
                                                    price={item.price}
                                                    mrpPrice={item.mrpPrice}
                                                    coverPic={item.coverImage ? Api.Media.getThumb(item.coverImage) : course1}
                                                />
                                            </Grid>
                                        )
                                }
                            </Box>
                        </Grid>
                    </>
                )
            }
            <Grid xs={12} item>
                <Link to="/courses" component={PrimaryButton}>View All Courses & Plan</Link>
            </Grid>
        </PageBlock >
    )
};

export default LatestCourseBlock;