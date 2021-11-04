import {
    PageBlock, SecondaryText, PrimaryText, TickLabels, BodyText
} from "./../../../features/Atoms"
import {
    Grid, Box
} from "@material-ui/core";
import teachers from "./../../../images/teachers.png"

const CertifiedTeacherBlock = () => (
    <PageBlock>
        <Grid item xs={12} container spacing={5}>
            <Grid item xs={12} sm={6} component={Box} style={{ textAlign: 'left', padding: '0 5%' }}>
                <PrimaryText >
                    CyberTeck Certified Instructors
                </PrimaryText>
                <BodyText className="marginGapBottom">
                    Online or on campus with iD Tech, your child is in safe, capablehand. For 20+
                    years, our family company has ensured the highhest standards for our stuff
                </BodyText>
                <TickLabels
                    label="Recruited from elite univercities like Standford, Caltech and NYU" />
                <TickLabels
                    label="Meticulous background and reference checks" />
                <TickLabels
                    label="All-adult instuctors, no high schoolersand CITs" />
                <TickLabels
                    label="Proven pedagogy and rigorous training" />
                <TickLabels
                    label="Adherence to American Camp Association accredited guidelines" />
                <TickLabels
                    label="CRP/First Aid certification (for on-campus stuff)" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <img src={teachers} style={{ width: '100%' }} />
            </Grid>
        </Grid>
    </PageBlock>
);

export default CertifiedTeacherBlock;