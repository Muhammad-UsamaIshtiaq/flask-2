import {
    TickLabels, PrimaryButton, PrimaryText
} from "./../../../features/Atoms"
import {
    Grid, Box
} from "@material-ui/core";
import free_tutorial_image from "./../../../images/free_1-1_tutorial_bg.jpg"
import { Link } from "react-router-dom/cjs/react-router-dom.min";



const CoursePointsBlock = (props) => (
    <Box container component={Grid}
        style={{
            background: '#f6f7f7',
            //background: 'url(https://cyberteckacademy.com/wp-content/uploads/2021/05/newsletterbg-1170x369.png)',
            backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: "content"
        }}>
        <Grid item xs={12} md={6} component={Box} style={{ textAlign: 'left', padding: "3% 7%" }}>
            <PrimaryText style={{ fontSize: '22px' }} className="marginGapBottom">
                In this course, you will
            </PrimaryText>
            {
                props.courseInfo && props.courseInfo.highlightPoints &&
                props.courseInfo.highlightPoints.map(item =>
                    <TickLabels style={{ marginBottom: 35 }} label={item} />
                )
            }
            {
                props.courseInfo &&
                props.courseInfo.courseType !== 'AT_SCHOOL_LOCATION' &&
                <>
                    <Link to="/courses" component={PrimaryButton} rounded>See All Courses</Link>
                    <PrimaryButton rounded>View Price & Date</PrimaryButton>
                </>
            }
        </Grid>
        <Grid item xs={12} md={6}>
            <img src={free_tutorial_image} style={{ width: '100%' }} />
        </Grid>
    </Box>
);

export default CoursePointsBlock;


