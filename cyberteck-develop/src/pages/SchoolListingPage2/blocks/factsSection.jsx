import indexBg from './../../../images/indexBg.jpg';
import Teachers_page2 from './../../../images/Teachers_page2.jpg';
import stats_bg from './../../../images/stats_bg.jpg';
import stats75 from './../../../images/stats75.png';
import f2 from './../../../images/f2.png';
import f3 from './../../../images/f3.png';

import staff from './../../../images/staff.PNG';
import { Box, Grid, Link, Paper, Typography, Hidden, Container } from "@material-ui/core";
import {
    BodyText,
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryButton, PrimaryText, SecondaryText
} from "./../../../features/Atoms"

export default () => {
    return (
        <div className="statsContainerAtLocation">
         <div className="uk-container">
            
            <div className="uk-margin-top   ">    

                         <div className="" uk-scrollspy="cls: uk-animation-scale-up; repeat: true">
                           <h1 className="header1 uk-margin-large-top uk-text-center">The numbers behind  <span className="greenText" > the facts</span></h1>
                                    <p className="uk-text-center withPaddingToCenterSubText">
                        
                                    See here Stats and Facts about the benefits of Computer Courses for kids

                             </p>
                         </div>

                        <div class="uk-grid-large uk-child-width-expand@s uk-text-center" data-uk-grid>

                                <div class="uk-margin-xlarge-top@s ">
                                    <img src={stats75}  className="statsImg"/>
                                   
                                    <h4 className=" bIcon_dark uk-text-bold uk-text-medium"> 4713 Tech hours completed</h4>
                                    
                                </div>


                                <div class="uk-margin-xlarge-top@s bIcon">
                                    <img src={f2}  className="statsImg"/>
                                    
                                    <h4 className="bIcon_dark uk-text-bold uk-text-medium" > 9 out of 10 CyberTeck students later follow the STEM path in college</h4>
                                    
                                </div>



                                <div class="uk-margin-xlarge-top@s bIcon">
                                    <img src={f3}  className="statsImg"/>
                                    
                                    <h4 className="bIcon_dark uk-text-bold uk-text-medium"> 61% increase in academic results when gamification is paired with study</h4>
                                    
                                </div>

                        </div>

                        </div>        
         </div>
         </div>
    )
}
