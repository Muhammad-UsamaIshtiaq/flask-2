import {
    SecondaryText, PrimaryText, BodyText, PageBlock, PrimaryButton
} from "./../../../features/Atoms"
import {
    Grid, Paper, Box
} from "@material-ui/core";
import skill_level_icon from "./../../../images/skill-level-150x150.png"
import grade_icon from "./../../../images/grade-150x150.png"
import price_icon from "./../../../images/price-150x150.png"
import path_icon from "./../../../images/path-150x150.png"
import prerequisite_icon from "./../../../images/prerequisite-150x150.png"
import tools_icon from "./../../../images/tools-150x150.png"
import Data from "../../../Data";
import { Link, useHistory } from "react-router-dom"
import { useSelector } from "react-redux";
import { useAuthorize } from "../../../features/Authentication/Authorize";
import CourseScheduleBlock from "./CourseScheduleBlock";



const CourseHighlightBlock = (props) => {
    console.log("COURSE: ", props?.courseInfo);
    const isTeacher = useAuthorize('TEACHER');
    const isStudent = useAuthorize('STUDENT');
    const history = useHistory();
    const bookSlotHandle = () => {
        isStudent ? history.push(`/courses/${props.courseInfo?.id}/${(props.courseInfo?.title || "").replaceAll(' ', '-')}/book`) : document.getElementById("authButton")?.click()
    }
    return (
        <PageBlock className="highlight"
            style={{
                backgroundImage: 'url(https://cyberteckacademy.com/wp-content/uploads/2021/05/section-bg-triangle-left3-1170x498.png)',
                backgroundSize: 'contain'
            }}>
            <Grid item xs={12}>
                <Box component={Grid} container pb={15}>
                    <Grid item xs={12} md={6} >
                        <Paper component={Grid} container elevation={2}
                            style={{ padding: "5% 1%", width: '90%', margin: 'auto' }} spacing={5}>
                            {(props?.courseInfo?.courseType === 'AT_SCHOOL_LOCATION') ? null : <Grid item xs={6} sm={4}>
                                <BodyText className="highlight-title">PRICING</BodyText>
                                <img className="highlight-image" src={price_icon} />
                                <BodyText>
                                    ${props.courseInfo?.price}&nbsp;&nbsp;
                                    <s>${props.courseInfo?.mrpPrice}</s>
                                </BodyText>
                            </Grid>}
                            <Grid item xs={6} sm={4}>
                                <BodyText className="highlight-title">Grade</BodyText>
                                <img className="highlight-image" src={grade_icon} />
                                <BodyText>{props.courseInfo && Data.Config.get(Data.Config.Grade, props.courseInfo.grade, 'displayName')}</BodyText>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <BodyText className="highlight-title">SKILL LEVEL</BodyText>
                                <img className="highlight-image" src={skill_level_icon} />
                                <BodyText>{props.courseInfo && Data.Config.get(Data.Config.SkillLevel, props.courseInfo.skillLevel, 'displayName')}</BodyText>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <BodyText className="highlight-title">TOOLS</BodyText>
                                <img className="highlight-image" src={tools_icon} />
                                <BodyText>{props.courseInfo?.tools || 'None'}</BodyText>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <BodyText className="highlight-title" >PREREQUISITE</BodyText>
                                <img className="highlight-image" src={prerequisite_icon} />
                                <BodyText>{props.courseInfo?.prerequisite || 'None'}</BodyText>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <BodyText className="highlight-title">PATH</BodyText>
                                <img className="highlight-image" src={path_icon} />
                                <BodyText>{props.courseInfo?.path || 'None'}</BodyText>
                            </Grid>
                            {
                                props.courseInfo &&
                                    props.courseInfo.courseType !== 'AT_SCHOOL_LOCATION'
                                    ? <Grid item xs={12} style={{ textAlign: 'left' }}>
                                        <Link rounded component={PrimaryButton}
                                            to={`/courses`}>All Courses</Link>
                                        {
                                            isTeacher &&
                                            <>
                                                <Link rounded component={PrimaryButton}
                                                    to={`/courses/${props.courseInfo?.id}/${(props.courseInfo?.title || "").replaceAll(' ', '-')}/edit`}>Edit Course</Link>

                                                <CourseScheduleBlock courseId={props.courseInfo.id} />
                                            </>
                                        }
                                        {
                                            isTeacher ||
                                            <Link rounded component={PrimaryButton}
                                                onClick={bookSlotHandle}>Book Your Slot</Link>
                                        }
                                    </Grid>
                                    : <Grid item xs={12} style={{ textAlign: 'left' }}>
                                        {
                                            isTeacher &&
                                            <>
                                                <Link rounded component={PrimaryButton}
                                                    to={`/courses/${props.courseInfo?.id}/${(props.courseInfo?.title || "").replaceAll(' ', '-')}/edit`}>Edit Course</Link>
                                            </>
                                        }
                                    </Grid>
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ position: 'relative' }}>
                        <Paper className="courseDescPaper" elevation={3}>
                            <SecondaryText style={{ fontSize: '20px' }} className="marginGapBottom">Course Description</SecondaryText>
                            <BodyText style={{ lineHeight: '30px' }}>
                                {props.courseInfo?.description}
                            </BodyText>
                        </Paper>
                    </Grid>
                </Box>
            </Grid>

            <Grid item xs={12} md={8} style={{ margin: 'auto', paddingBottom: '9%' }}>
                <PrimaryText className="marginGapBottom">
                    {props.courseInfo?.subTitle}
                </PrimaryText>
                <BodyText>
                    {props.courseInfo?.subDescription}
                </BodyText>
            </Grid>
        </PageBlock>
    );
};

export default CourseHighlightBlock;


