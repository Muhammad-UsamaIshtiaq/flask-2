import { Box, Grid, Link, Paper, Typography, Hidden, Container } from "@material-ui/core";
import {
    BodyText,
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryButton, PrimaryText, SecondaryText
} from "./../../../features/Atoms";
import curvedBg from './../../../images/curvedBg.jpg';
import computer_courses_icon from './../../../images/computer-courses-icon.png';


import curated_online_courses from './../../../images/curated_online_courses.png';
import dedicated_teachers from './../../../images/Dedicated_teachers.png';
import experience from './../../../images/experience.png';
import flexibility_affordability from './../../../images/flexibility_affordability.png'

export default () => {
    return (
       <div className=" secondPaneBg">
           <div className="uk-container">
               <div className=" " data-uk-grid>
                    <div className="uk-width-1-2@s uk-hidden@s  ">
                      <h1 className="header1 light " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Why  Trust CyberTeck at School Location Program</h1>
                    <p className="subText light" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">To enhance results and open new doors, we are constantly adapting our selection of courses to fit today’s accelerated tech advance.</p>
                    </div>

                    <div className="uk-width-1-2@s  uk-visible@s uk-margin-xlarge-top ">
                      <h1 className="header1 uk-margin-xlarge-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Why Trust CyberTeck at <span className="greenText">School Location Program</span></h1>
                    <p className="subText" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">To enhance results and open new doors, we are constantly adapting our selection of courses to fit today’s accelerated tech advance.</p>
                    </div>

                    <div className="uk-width-1-2@s">
                      
                    </div>
               </div>



          
               <div className="" >
                     <div className="uk-margin-xlarge-top">
                            <div class="uk-grid-large" data-uk-grid>
                                  
                                        <div class="uk-width-1-4@s"  uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                        <div className="schoolDescIconBg">
                                              <div className=" uk-flex uk-flex-center">
                                               
                                                   <img src ={dedicated_teachers}  className="iconImg"/>
                                            </div>

                                                <div>
                                                    <h5 className="uk-text-center light iconHeaderBold">Dedicated Tech Teachers </h5> 

                                                    <p className="uk-text-center light iconParagraphSmall">Tech expertise and a passion for teaching makes our educators
                                                         essential to preparing the next generation of tech savvys. </p>
                                                         </div>

                                            </div>
                                        </div>
                                 
                                    
                                        <div class="uk-width-1-4@s  uk-margin-large-top" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                                        <div className="schoolDescIconBg">
                                              <div className=" uk-flex uk-flex-center">
                                               
                                                   <img src ={experience}  className="iconImg"/>
                                            </div>

                                                <div>
                                                    <h5 className="uk-text-center light iconHeaderBold">Over 10 Years Experience </h5> 

                                                    <p className="uk-text-center light iconParagraphSmall">CyberTeck Academy is long active in the 
                                                    education sector with a proven track record in delivering knowledge and building skills for the future. </p>
                                                         </div>

                                            
                                        </div></div>
                                 
                                   
                                        <div class="uk-width-1-4@s  " uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                        <div className="schoolDescIconBg">
                                              <div className=" uk-flex uk-flex-center">
                                               
                                                   <img src ={curated_online_courses}  className="iconImg"/>
                                            </div>

                                                <div>
                                                    <h5 className="uk-text-center light iconHeaderBold">Curated courses that deliver </h5> 

                                                    <p className="uk-text-center light iconParagraphSmall">Carefully chosen courses, specifically address age
                                                     appropriate skill development. Best part: for students it’s a lot of fun. </p>
                                                         </div>
                                              </div>
                                            
                                        </div>





                                      <div class="uk-width-1-4@s  uk-margin-large-top " uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                                          <div className="schoolDescIconBg">
                                              <div className=" uk-flex uk-flex-center">
                                               
                                                   <img src ={flexibility_affordability}  className="iconImg"/>
                                            </div>

                                                <div>
                                                    <h5 className="uk-text-center light iconHeaderBold">Flexibility and affordability </h5> 

                                                    <p className="uk-text-center light iconParagraphSmall">Every child should have access to 
                                                    receiving/ essential programming skills. Our rates and scheduling options reflect this.</p>
                                                         </div>

                                                         </div>
                                        </div>





                                 
                            </div>
                     </div>
               </div>







           </div>
       </div>
    )
}
