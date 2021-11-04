import "./../homepage.css"
import {
    PageBlock, PrimaryText, BodyText, SecondaryText
} from "../../../features/Atoms"
import {
    Grid, Avatar, Box, IconButton
} from "@material-ui/core";
import { Rating } from '@material-ui/lab'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowRightTwoToneIcon from '@material-ui/icons/KeyboardArrowRightTwoTone';
import KeyboardArrowLeftTwoToneIcon from '@material-ui/icons/KeyboardArrowLeftTwoTone';
import testimonial1 from "./../../../images/testimonial1-150x150.png"
import testimonial2 from "./../../../images/testimonial2-150x150.png"
import testimonial3 from "./../../../images/testimonial3-150x150.png"
import testimonial4 from "./../../../images/testimonial4-150x150.png"

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <IconButton>
        <KeyboardArrowRightTwoToneIcon />
    </IconButton>,
    prevArrow: <IconButton>
        <KeyboardArrowLeftTwoToneIcon />
    </IconButton>,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: true
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const WhyParentLoveUsBlock = () => (
    <PageBlock style={{ background: '#f2f2f2', textAlign: 'center', paddingTop: 0 }}
        gridStyle={{ paddingTop: 0 }}>
        <Grid item xs={12} >
            <PrimaryText >
                Why do parents  &nbsp;
                <b className="greenText">love us?</b>
            </PrimaryText>
            <br /><br />
            <BodyText >
                Cyberteck Academy delivers results. Students enjoy learning from educators passionate<br />
                about everything tech. Parents notice enhanced academic performance. School gets easier<br />
                and new doors open.
            </BodyText>
        </Grid>
        <Grid item xs={12} container style={{ textAlign: 'left', paddingTop: 60 }}>
            <Slider {...settings}>
                <Box style={{ textAlign: 'center !important' }}>
                    <Box pb={4}>
                        <Avatar style={{ margin: 'auto', height: 110, width: 110 }}
                            src={testimonial1} />
                    </Box>
                    <Box>
                        <BodyText style={{padding: "0 8%"}}>
                            My boy is all the time excited to learn something new in Minecraft. He is captivated by what his teacher shows him, and tries to make the designs by himself more and more. It’s good to see him so interested in a class.
                        </BodyText><br />
                        <SecondaryText>Anja Brass</SecondaryText>
                        <Rating readOnly defaultValue={2.5} />
                        <BodyText>Loudoun C</BodyText>
                    </Box>
                </Box>
                <Box style={{ textAlign: 'center !important' }}>
                    <Box pb={4}>
                        <Avatar style={{ margin: 'auto', height: 110, width: 110 }}
                            src={testimonial2} />
                    </Box>
                    <Box>
                        <BodyText style={{padding: "0 8%"}}>
                            My boy is all the time excited to learn something new in Minecraft. He is captivated by what his teacher shows him, and tries to make the designs by himself more and more. It’s good to see him so interested in a class.
                        </BodyText><br />
                        <SecondaryText>Hank</SecondaryText>
                        <Rating readOnly defaultValue={4.5} />
                        <BodyText>Georgetown</BodyText>
                    </Box>
                </Box>           
                <Box style={{ textAlign: 'center !important' }}>
                    <Box pb={4}>
                        <Avatar style={{ margin: 'auto', height: 110, width: 110 }}
                            src={testimonial3} />
                    </Box>
                    <Box>
                        <BodyText style={{padding: "0 8%"}}>
                            My boy is all the time excited to learn something new in Minecraft. He is captivated by what his teacher shows him, and tries to make the designs by himself more and more. It’s good to see him so interested in a class.
                        </BodyText><br />
                        <SecondaryText>Andrew Greenwood</SecondaryText>
                        <Rating readOnly defaultValue={4} />
                        <BodyText>Leesburg</BodyText>
                    </Box>
                </Box>
                <Box style={{ textAlign: 'center !important' }}>
                    <Box pb={4}>
                        <Avatar style={{ margin: 'auto', height: 110, width: 110 }}
                            src={testimonial4} />
                    </Box>
                    <Box>
                        <BodyText style={{padding: "0 8%"}}>
                            My boy is all the time excited to learn something new in Minecraft. He is captivated by what his teacher shows him, and tries to make the designs by himself more and more. It’s good to see him so interested in a class.
                        </BodyText><br />
                        <SecondaryText>Leeana M</SecondaryText>
                        <Rating readOnly defaultValue={3.0} />
                        <BodyText> Ashburn</BodyText>
                    </Box>
                </Box>
            </Slider>
        </Grid>
    </PageBlock>
);

export default WhyParentLoveUsBlock;
