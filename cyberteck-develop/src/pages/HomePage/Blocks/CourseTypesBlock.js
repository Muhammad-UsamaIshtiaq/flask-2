import { Grid, Typography, Paper, Box, ButtonBase, Button } from "@material-ui/core";
import indexBg from "./../../../images/indexBg.jpg"
import {
    TickLabels, PrimaryText, SecondaryText, PrimaryButton, PageBlock, BodyText
} from "./../../../features/Atoms"
import computer_courses_icon from "./../../../images/computer-courses-icon.png"
import tech_camps_icon from "./../../../images/tech-camps-icon.png"
import courses_at_school_location_icon from "./../../../images/courses-at-school-location-icon.png"
import tech_camps_at_school_location from "./../../../images/tech-camps-at-school-location.png"
import courses_at_parks_and_recs from "./../../../images/courses-at-parks-and-recs.png"
import virtual_tutoring_icon from "./../../../images/virtual-tutoring-icon.png"
import { Link } from "react-router-dom";

function CourseTypesBlock(props) {

    return (
    
        <PageBlock style={{ background: `url(${indexBg})`, paddingTop: '6%' }}  >
            <Grid item xs={12} md={1} ></Grid>
            <Grid item xs={12} md={6} >
                <Box container component={Grid} spacing={3}>
                    <Grid item lg={4} md={6} sm={4} xs={6}>
                        <CourseTypeButton bgColor="#e9b730"
                            icon={computer_courses_icon}
                            label="Computer Courses"
                            targetLink="/computer-course" />
                    </Grid>
                    <Grid item lg={4} md={6} sm={4} xs={6}>
                        <CourseTypeButton bgColor="#73d56e" label="Tech Camps"
                            icon={tech_camps_icon}
                            targetLink="/techcamp-course"
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={4} xs={6}>
                        <CourseTypeButton bgColor="#1fc1da" label="Virtual Math Tutoring"
                            icon={virtual_tutoring_icon}
                            targetLink="/coming-soon" />
                    </Grid>
                    <Grid item lg={4} md={6} sm={4} xs={6}>
                        <CourseTypeButton bgColor="#126d77" label="Course at School Location"
                            icon={courses_at_school_location_icon}
                            targetLink="/schools" />
                    </Grid>
                    <Grid item lg={4} md={6} sm={4} xs={6}>
                        <CourseTypeButton bgColor="#8564e9" label="Tech Camps at School Location"
                            icon={tech_camps_at_school_location}
                            targetLink="/schools-list" />
                    </Grid>
                    <Grid item lg={4} md={6} sm={4} xs={6}>
                        <CourseTypeButton bgColor="#d94da6" label="Courses at Park & Rec Center"
                            icon={courses_at_parks_and_recs}
                            targetLink="/coming-soon" />
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12} md={5} style={{ textAlign: 'left' }}>
                <h1 className="header1" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                    What We Offer&nbsp;
                    <b className="greenText">at <br />CyberTeck Academy</b>
                </h1>
             
                <h4 className="bold">
                    We boost your learning abilities while thinking two steps ahead.
                </h4>
                <TickLabels label="Power up academic performance with top educators."  />
                <TickLabels label="Build up a tech skillset with computer courses starting at a young age" />
                <TickLabels label="Mix tech and learning for the best experiences at funTech Camps, @Home or @School" />
                {/* <PrimaryButton rounded>About Us</PrimaryButton> */}
            </Grid>
        </PageBlock>
     
    );
}

export default CourseTypesBlock;

export const CourseTypeButton = (props) => (
    <Link
        to={props.targetLink || 'coming-soon'}
        component={ButtonBase} style={{
            background: props.bgColor, color: 'white', width: '100%',
            borderRadius: 15, padding: "22% 0%", height: '50%'
        }}
        variant="outlined"  >
        <div style={{ textAlign: 'center' }}>
            <img src={props.icon}
                style={{ width: 40 }}
            />
            <Typography className="secondaryTest textPoppins" style={{ margin: 0, fontSize: '14px' }}>{props.label}</Typography>
            {
                props.desc &&
                <BodyText style={{ color: 'white', fontSize: '14px', padding: '5%' }}>{props.desc}</BodyText>
            }
        </div>
    </Link>
);
