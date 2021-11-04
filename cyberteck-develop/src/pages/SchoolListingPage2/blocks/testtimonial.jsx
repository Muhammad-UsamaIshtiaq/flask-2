import indexBg from './../../../images/indexBg.jpg';
import Teachers_page2 from './../../../images/Teachers_page2.jpg';
import staff from './../../../images/staff.PNG';
import { Box, Grid, Link, Paper, Typography, Hidden } from "@material-ui/core";
import {
    BodyText,
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryButton, PrimaryText, SecondaryText
} from "./../../../features/Atoms"
import YouTube from 'react-youtube';

export default () => {
    return (
        <div className="uk-margin-xlarge-top uk-margin-xlarge-bottom">
        <Grid container style={{ padding: '5% 10%', backgroundImage: `url(${indexBg})`, backgroundSize: 'cover',backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <Grid item xs={12} style={{marginTop: 30}}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                    <h1 className="header1 uk-margin-large-top uk-text-center">Why do parents  <br />
                                    <span className="greenText" >love us?</span></h1>
                                    <p className="uk-text-center withPaddingToCenterSubText">
                        
CyberTeck Academy delivers results. Students enjoy learning from dedicated educators. School gets easier and a new passion for tech is born.

                             </p>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
                <Grid container spacing={6}>
                    <Grid item sm={6}>
                        <YoutubeWrapper videoId="fFdsZkEhDio" />
                    </Grid>
                    <Grid item sm={6}>
                        <YoutubeWrapper videoId="qAKZzzLql3o" />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </div>
    )
}


const YoutubeWrapper = props => {
    const videoPlayerOptions = {
        width: '100%',
        // height: window.innerWidth < 700 ? '400px' : '850px',
        objectFit: 'cover',
    };
    return <Paper style={{ padding: 20 }}>
        <Grid container direction="row"
            justifyContent="center"
            alignItems="center" style={{ marginTop: 25 }}>
            <Grid item xs={12}>
                <YouTube videoId={props?.videoId} opts={videoPlayerOptions}/>
            </Grid>
        </Grid>
    </Paper>
}