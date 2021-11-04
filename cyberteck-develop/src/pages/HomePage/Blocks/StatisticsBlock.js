import {
    PageBlock, SecondaryText
} from "./../../../features/Atoms"
import {
    Grid, Typography
} from "@material-ui/core";

const StatisticsBlock = () => (
    <PageBlock style={{ background: '#f6f7f7', textAlign: 'center' }}  gridStyle={{ paddingTop: 0 }}>
        <Grid item sm={4} xs={12}>
            <Typography variant="h2" className="greenText"
                style={{ fontFamily: 'Poppins', fontWeight: 900, display: 'inline', fontSize: '75px' }}>
                81
            </Typography>
            <b style={{ fontSize: '38px' }}>%</b>
            <SecondaryText>Increase in academic results</SecondaryText>
        </Grid>
        <Grid item sm={4} xs={12}>
            <Typography variant="h2" className="greenText"
                style={{ fontFamily: 'Poppins', fontWeight: 900, display: 'inline', fontSize: '75px' }}>
                4713
            </Typography>
            <SecondaryText>Tech hours completed</SecondaryText>
        </Grid>
        <Grid item sm={4} xs={12}>
            <Typography variant="h2" className="greenText"
                style={{ fontFamily: 'Poppins', fontWeight: 900, display: 'inline', fontSize: '75px' }}>
                100
            </Typography>
            <b style={{ fontSize: '38px' }}>%</b>
            <SecondaryText>Satisfaction Rate</SecondaryText>
        </Grid>
    </PageBlock>
);

export default StatisticsBlock;