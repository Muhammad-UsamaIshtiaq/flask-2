import {
    PageBlock, SecondaryText, PrimaryText, TickLabels, BodyText
} from "./../../../features/Atoms"
import {
    Grid, Box
} from "@material-ui/core";
import teachers from "./../../../images/teachers.png"

const EliteTeachersBlock = () => (
    <PageBlock>
        <Grid item xs={12}>
            <PrimaryText className="marginGapBottom">
                Accelerate your child’s path to a<br /> future tech savvy with top&nbsp;
                <b className="greenText">Teachers</b>
            </PrimaryText>
            <SecondaryText className="marginGapBottom">Expert Teachers for future Tech experts</SecondaryText>
            <BodyText className="marginGapBottom">
                Our teachers put their passion where their expertise is. Selected from tech
                universities, IT experts are here to awaken your child’s interest in the world
                of Tech. Fun is contagious and students build critical thinking, design abilities
                and creativity under the right guidance.
            </BodyText>
        </Grid>
        <Grid item xs={12} container spacing={5}>
            <Grid item xs={12} sm={6} component={Box} style={{ textAlign: 'left' }}>
                <PrimaryText style={{ fontSize: '22px' }} className="marginGapBottom">
                    Dedicated teachers inspire young minds and build a creative hub
                </PrimaryText>
                <BodyText className="marginGapBottom">
                    First hand experience in <b>virtual</b> and <b>in-person</b> teaching makes them efficient, able to
                    achieve fast results  and keep students engaged.
                </BodyText>
                <SecondaryText className="greenText">CyberTeck’s best talent pool: </SecondaryText>
                <TickLabels style={{ marginBottom: 10 }}
                    label="Recruited from top tech universities like MIT or NYU" />
                <TickLabels style={{ marginBottom: 10 }}
                    label="USA-based teachers selected after extensive background checks" />
                <TickLabels style={{ marginBottom: 10 }}
                    label="Deliver results with proven teaching methods for all students" />
                <TickLabels style={{ marginBottom: 10 }}
                    label="Know how to connect to students and develop their creative curiosity" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <img src={teachers} style={{ width: '100%' }} />
            </Grid>
        </Grid>
    </PageBlock>
);

export default EliteTeachersBlock;