import {
    BannerTextLink, PrimaryText, BodyText, PrimaryButtonOutlined
} from "../../../features/Atoms"
import {
    Grid, Box
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import discovery_Bg_small from "./../../../images/discovery_Bg_small.jpg"
import free_tutorial_bg from "./../../../images/free_1-1_tutorial_bg.jpg"
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const BannerBlockBlock = () => (

<section>
         <div className="uk-grid uk-grid-collapse" data-uk-grid>
                  <div className="uk-width-1-2@s">
                    <div className="leftCTAImgBg  uk-padding-large">
                    <div className="uk-margin-large-top">
                                    <h5 className="  light  uk-text-small uk-text-center uk-text-light ">YOU CAN TEST OUR COMPUTER COURSES LIVE!</h5>
                                    <h3  className="header5 uk-text-center light" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">Claim your 30 Min <span className="greenText">Free Discovery Lesson</span></h3>
                                   
                                    <div class="uk-flex uk-text-center uk-margin-medium-top uk-flex-center">
                                        <div class="btn-ghost" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Schedule</div>
                                        
                                    </div>

                                    
                                    </div>
                    </div>
                  </div>

                  <div className="uk-width-1-2@s">
                  <div className="rightCTAImgBg  uk-padding-large">
                    <div className="uk-margin-large-top">
                                    <h5 className="  light  uk-text-small uk-text-light uk-text-center">YOU CAN TEST OUR COMPUTER COURSES LIVE!</h5>
                                    <h3  className="header5 light uk-text-center" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">Claim your 30 Min <span className="greenText">Free Discovery Lesson</span></h3>
                                   
                                    <div class="uk-flex uk-text-center uk-margin-medium-top uk-flex-center ">
                                        <div class="btn-ghost " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Schedule</div>
                                        
                                    </div>

                                    
                                    </div>
                    </div>
                  </div>
         </div>
         </section>         
);

export default BannerBlockBlock;