import indexBg from './../../../images/indexBg.jpg';
import intro_img1 from './../../../images/intro_img1.png';
import intro_img2 from './../../../images/intro_img2.png';
import intro_img3 from './../../../images/intro_img3.png';
import Teachers_page2 from './../../../images/Teachers_page2.jpg';
import staff from './../../../images/staff.PNG';
import { Box, Grid, Paper, Typography, Hidden } from "@material-ui/core";
import {
    BodyText,
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryButton, PrimaryText, SecondaryText
} from "./../../../features/Atoms"
import { Link } from 'react-router-dom';




export default () => {
    return (

      <div className="uk-container uk-margin-xlarge-top">
                 <div className="animationBg">

                 <div class="uk-text-center " data-uk-grid>
                        <div class="uk-width-1-2@s">
                       
                        <div class="introImg2"><img src={intro_img2}  uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/></div>
                        
                        </div>
                        <div class="uk-width-1-2@s">
                            < p className="uk-text-left" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">CyberTeck Academy partners up with Schools and Parks & Rec Centers to deliver
                                 tech education closer to home. We support our students’ academic path by 
                                 adding tech knowledge and programming to their skillset. The future is tech
                                  and parents everywhere value our computer courses. Our game design,
                                 video animation, robotics and engineering courses build essential knowledge 
                                 and make kids love learning.</p>

                                 
                      <div class="uk-flex  ">
                        <div class="btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">See all Courses</div>
                       
                      </div>
                        </div>
                 </div>

                 <div class="uk-text-center " data-uk-grid>
                        <div class="uk-width-1-3@s">
                       
                        
                        
                        </div>
                        <div class="uk-width-2-3@s">
                            <div class="introImg1"><img src={intro_img1} uk-scrollspy="cls: uk-animation-slide-right; repeat: true"/></div>
                        </div>
                 </div>
















                 </div>
      </div>







    )
}