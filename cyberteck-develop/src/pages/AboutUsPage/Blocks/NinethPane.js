import react from 'react';
import onlineCourse from '../../../images/online-classroom.png';
import cyberteckKids from '../../../images/cyberteck-kids.png'
import check from '../../../images/check.png';
import { Link } from "react-router-dom";




const NinethPane =  () =>( 

    <div className="uk-container">

                    <div className="uk-padding-large">
                     <h3 className="header1 withPaddingLarge  uk-text-center">You heard what we can do. Now try it out! Discovery Lessons are on us.</h3>
                   </div>


                   <div className="uk-grid" data-uk-grid>
                         <div className="uk-width-1-2@s">
                            <div><img src={onlineCourse} uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/></div>
                         </div>

                         <div className="uk-width-1-2@s">
                         <div className="uk-padding-large">
                          
                           <h3 className="header4  uk-text-left">
                            Try our Tech Camps at Parks & Rec Centers and School Locations Near You</h3>
                           <div className="uk-text-left ">
                           <p className="uk-padding-top" >CyberTeck Academy partners with Parks & Rec Centers and Schools 
                           to make sure students complement their tech education. We make it easy and accessible
                            for your kid to experience fun Summer and Spring Break Camps, in addition to Computer
                             Courses during school year. Check locations available and choose one that is closer 
                             to you. Go for Virtual or In-Person and start attending at partner locations near you.</p></div>
                             
                             <Link to="/techcamp-course">  <div class="btn uk-margin-top  single-btn" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Learn More</div></Link>

                     </div>
                     </div>
                   </div>



                   <div className="uk-grid" data-uk-grid>
                         <div className="uk-width-1-2@s">

                         <div className="uk-padding">
                          
                          <h3 className="header4  uk-text-left">
                           
                               You can also go for Virtual Small Group Computer Courses</h3>


                           <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                  
                                   <p className="iconParagraph">Students create together and share with friends the best game designs, coding or 3D modelling projects</p>
                                   </div>
                               </div>

                           </div>


                           <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                  
                                   <p className="iconParagraph">Trust our teachers’ extensive experience and tech expertise and let them guide your child while learning and gaining confidence</p>
                                   </div>
                               </div>

                           </div>



                           <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                  
                                   <p className="iconParagraph">Affordable financial packages available by joining groups of friends passionate about tech</p>
                                   </div>
                               </div>

                           </div>


                           <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                  
                                   <p className="iconParagraph">Go for Combo Courses to build an immersive experience into the world of tech</p>
                                   </div>
                               </div>

                           </div>







                            
                            <div class="btn uk-margin-top  single-btn" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Learn More</div>

                    </div>



                         </div>

                         <div className="uk-width-1-2@s">
                          
                         <div><img src={cyberteckKids} uk-scrollspy="cls: uk-animation-slide-right; repeat: true"/></div>
                     </div>
                   </div>

     </div>

     
);



export default NinethPane;