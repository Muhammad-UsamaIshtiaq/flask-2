import { Grid, IconButton, TextField } from "@material-ui/core";
import mainLogo from "./../../../images/logo_main.png"
import { BodyText, PrimaryButton, SecondaryText } from "../../../features/Atoms";
import map2 from "./../../../images/map2.png"
import newsletter_purple2 from "./../../../images/newsletter_purple2.png"
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import ArrowRightTwoToneIcon from '@material-ui/icons/ArrowRightTwoTone';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Link } from "react-router-dom";


const FooterBlock = () => (
    <Grid container className="footerBlock">
        <Grid item xs={12} className="footerBorderBottom" style={{ color: 'white', textAlign: 'center' }}>
            <IconButton className="socialIcon">
                <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton className="socialIcon">
                <InstagramIcon fontSize="large" />
            </IconButton>
            <IconButton className="socialIcon">
                <YouTubeIcon fontSize="large" />
            </IconButton>
        </Grid>
        <Grid item xs={12} container spacing={2} className="footerBorderBottom" style={{ textAlign: 'left' }}>
            <Grid item xs={6} sm={4} md={2}>
                <SecondaryText className="footerTitle">Our Programs</SecondaryText>
                <ul className="footerLinkContainer">
                    {/* <li component="a" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        Virtual 1 on 1
                    </li>
                    <li component="a" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        Virtual Small Group
                    </li>
                    <li component="a" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        At School Locations
                    </li>
                    <li component="a" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        Tech Camp
                    </li> */}
                    <Link to="/techcamp-course" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        Tech Camp
                    </Link>
                    <Link to="/computer-course" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        Computer Courses
                    </Link>
                    <Link to="/schools" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        Courses At School
                    </Link>
                </ul>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
                <SecondaryText className="footerTitle">Useful Links</SecondaryText>
                <ul className="footerLinkContainer">
                    <Link to="/faq" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        FAQs
                    </Link>
                    <Link to="/contactus" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        Contact Us
                    </Link>
                    <Link to="/about-us" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        About Us
                    </Link>
                    <Link to="/termsConditionPage" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        Terms and Conditions
                    </Link>
                    <Link to="/privacypolicy" className="footerLink">
                        <ArrowRightTwoToneIcon className="icon" />
                        Privacy Policy
                    </Link>
                </ul>
            </Grid>
            <Grid item xs={12} md={2} sm={4}>
                <SecondaryText className="footerTitle">Contact Us</SecondaryText>
                <ul className="footerLinkContainer">
                    <li style={{ fontSize: '14px', lineHeight: '20px', paddingBottom: '8px' }}>
                        <LocationOnTwoToneIcon className="icon" />
                        43300 Southern Walk Plaza Ste 221, 116, Broadland, VA 20148
                    </li>
                    <li style={{ fontSize: '14px', lineHeight: '20px' }}>
                        <EmailTwoToneIcon className="icon" />
                        info@cyberteckacademy.com
                    </li>
                </ul>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
                <img src={map2} style={{ width: '90%' }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={{ textAlign: 'left' }}>
                <div className="marginGapBottom">
                    <img src={mainLogo} style={{ width: '75%' }} />
                </div>
                <BodyText>
                    Experience in building futures. This is what our services deliver through Computer Courses, Tech Camps and Virtual Tutoring. We make a commitment to develop essential tech skills for tomorrow’s professionals.
                </BodyText>
            </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
            <Grid item md={4} xs={12}>
                <SecondaryText style={{ backgroundImage: `url(${newsletter_purple2})`, paddingLeft: '10%' }} className="subscribeLabel">OUR NEWSLETTER</SecondaryText>
            </Grid>
            <Grid item md={5} xs={12}>
                <TextField fullWidth size="small" placeholder="Subscribe Email"
                    inputProps={{ className: "subscribeInputBox" }}
                    variant="outlined" />
            </Grid>
            <Grid item md={3} xs={12}>
                <Link to="/coming-soon" component={PrimaryButton} rounded style={{ width: '100%' }}>
                    SUBSCRIBE NOW
                </Link>
            </Grid>
        </Grid>
    </Grid >
);

export default FooterBlock;