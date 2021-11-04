import {
    PageBlock, PrimaryText, BodyText, PrimaryButtonOutlined
} from "../../../features/Atoms"
import {
    Grid
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image_paneNew from "./../../../images/image_paneNew.png"
import halfee from "./../../../images/halfee.png"


const VirtualTutoringBlock = () => (
    <PageBlock style={{ backgroundImage: `url(${halfee})` }}
        gridStyle={{ paddingTop: 0 }} >
        <Grid container xs={12} item style={{ textAlign: 'left' }}>
            <Grid item xs={12} sm={6}>
                <BodyText style={{ fontWeight: 600 }}>
                    VIRTUAL TUTORING
                </BodyText>
                <PrimaryText className="marginGapBottom" >
                    Upgrade Your Skills&nbsp;
                    <b className="greenText">Upgrade<br/> Your Life</b>
                </PrimaryText>
                <BodyText className="marginGapBottom" >
                    Top teachers, the right approach and an open attitude to learning are the ingredients that promise results in school. Improve the exact area that you need or get to that next level with personalized lessons 1-on-1 or in small groups. Nothing can stop our students from achieving academic excellence.
                </BodyText>
            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                <img src={image_paneNew} style={{ width: '90%' }} />
            </Grid>
        </Grid>
    </PageBlock>
);

export default VirtualTutoringBlock;
