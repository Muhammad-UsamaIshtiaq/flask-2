import "./faq.css";
import { Grid, InputBase, Button, Hidden } from "@material-ui/core";
import {
  HeaderBox,
  PrimaryText,
  PageBlock,
  HeaderTitle,
  PrimaryButton,
  HeaderDescription
} from "./../../features/Atoms";
import Layout from "../Layout";
import coverImg from "./../../images/faq_header.jpg";

import FaqBlock from "./Block/faqSection";
import FaqData from "./faqdata";

export default (props) => {
  console.log(FaqData);
  return (
    <Layout>
      <HeaderBox style={{ paddingTop: "35%" }} fullWidth coverPic={coverImg}>
        <PrimaryText
          style={{ textAlign: "center", padding: 35, color: "white" }}
        >
          FAQ Section
        </PrimaryText>
        <Hidden mdDown>
          <HeaderDescription style={{ textAlign: "center" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed velit ac diam luctus lacinia id eleifend libero. Nam id sagittis elit. In consequat, neque a tempor lacinia, neque sem scelerisque nunc, sit amet malesuada ex erat vel nulla. Cras lacinia, turpis venenatis placerat dignissim, libero erat cursus nibh, in tristique magna mauris eget tellus. Donec vitae turpis est. Cras scelerisque pellentesque ligula, vel tincidunt eros pulvinar non. Fusce posuere felis faucibus velit vestibulum efficitur. Vestibulum quis sollicitudin ex. Nulla finibus leo vitae pretium iaculis.
          </HeaderDescription>
        </Hidden>
      </HeaderBox>
      <PageBlock>
          {FaqData.map((faqBlockData) => (
            <Grid item sm={4}>
              <FaqBlock data={faqBlockData} />
            </Grid>
          ))}
      </PageBlock>
    </Layout>
  );
};
