import {
    SecondaryText, PrimaryText, BodyText
} from "./../../../features/Atoms"
import {
    Grid, Box
} from "@material-ui/core";
import course_requirements from "./../../../images/ty-860x573.jpg"
import Data from "../../../Data";

const CourseRequirementsBlock = (props) => (
    <Box container component={Grid}
        style={{
            //backgroundImage: course_requirements ,
            backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: "content",

        }}>
        <Grid item xs={12} md={6}>
            <img src={course_requirements} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6} component={Box} p={5}>
            <PrimaryText className="marginGapBottom" style={{ fontSize: '22px' }}>
                Online Course Requirements:
            </PrimaryText>
            <BodyText className="marginGapBottom">
                Top teachers, the right approach and an open attitude to learning are the ingredients that promise results in school.
            </BodyText>
            <Grid container spacing={1} className="marginGapTop">
                {
                    props.courseInfo && props.courseInfo.requirements &&
                    props.courseInfo.requirements.map(item => {
                        const dataReq = Data.Config.Requirements[item]
                        return dataReq &&
                            <Grid item xs={6} sm={3}>
                                <img src={dataReq.icon} style={{ width: '60%' }} />
                                <SecondaryText style={{ fontSize: '13px' }}>{dataReq.displayName}</SecondaryText>
                            </Grid>

                    })
                }
            </Grid>
        </Grid>
    </Box>
);

export default CourseRequirementsBlock;