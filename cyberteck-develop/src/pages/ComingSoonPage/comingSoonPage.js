import { Grid } from "@material-ui/core";
import {
    BodyText, PageBlock, HeaderBox, HeaderTitle, PrimaryButton, SecondaryText, PrimaryText,
} from "../../features/Atoms";
import Layout from "../Layout";
import staff from "./../../images/staff.PNG"
import indexImg from "./../../images/Indexbackground.jpg";



export default function ComingSoonPage(props) {

    return (
        <Layout className="detailsBlock">
            <HeaderBox coverPic={indexImg} style={{ paddingTop: '35%', }} >
                <HeaderTitle className="marginGapBottom">
                    Feature Coming Soon
                </HeaderTitle>
            </HeaderBox>
            <PageBlock className="highlight" style={{ textAlign: 'left' }}>
                <Grid item xs={12} md={8} style={{ margin: 'auto' }}>
                    <PrimaryText>Coming Soon</PrimaryText>
                </Grid>
            </PageBlock>
        </Layout>
    );
}