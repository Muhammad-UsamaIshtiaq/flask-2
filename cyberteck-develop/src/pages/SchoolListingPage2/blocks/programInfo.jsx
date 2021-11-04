import staff from './../../../images/staff.PNG';
import tick_icon from "./../../../images/tick_icon.png";
import teachers_img from './../../../images/teachers.png';
import curve_laptop from './../../../images/curve_laptop.png';
import check from "./../../../images/check.png";
import img_location from "./../../../images/img_at_location.png";
import { Container, Box, Grid, Link, Paper, Typography, Hidden, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import {
    BodyText,
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryButton, PrimaryText, SecondaryText
} from "./../../../features/Atoms";
import AddCircleIcon from '@material-ui/icons/AddCircle';
export default () => {
    return (
      

                


         <div className="curvedBg uk-margin-xlarge-top">
              <div className="uk-container">

                       <div className="uk-width-1-1">
                               <div className="uk-container uk-margin" uk-scrollspy="cls: uk-animation-scale-up; repeat: true">
                                   
                                    <h1 className="header1  uk-text-center uk-margin-large-top "> Additional education from A to Z </h1>
                                    <p className="subText uk-text-center withPaddingLarge ">We supply the locations with both equipment and software, along with the
                                         necessary set-up. Everything prepared in advance to start learning right away.
                                    </p>
                                  </div>
                       </div>

                  <div className="uk-grid" data-uk-grid>
                              <div className="uk-width-1-2@s">

                               {/*Accordion goes here  */}
                                  
                                  <div className="accordionContainer uk-margin-large-top">
                                  <ul uk-accordion="collapsible: false">
                                                    <li uk-scrollspy="cls: uk-animation-fade4; repeat: true">
                                                        <a class="uk-accordion-title accHeader" href="#">Opportunities for all students, no matter the background</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Our courses build skills for the future and everyone is entitled to access education. That is why we offer
                                                                 scholarships to qualified underprivileged students and create equal chances for all.</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Selection of courses that teach in-demand tech skills</a>
                                                        <div class="uk-accordion-content">
                                                            <p>We chose courses that are proven to build students’ skills for tomorrow. Classes with projects that cover programming like Python, 
                                                                robotics and drone engineering, 3D printing or game design and video animation.</p>
                                                        </div>
                                                    </li>
                                               

                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Top Tech Experts guide through the world of tech</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Qualified teachers selected from top tech universities make sure knowledge
                                                                 is built at the right pace and made easy for all to understand.
</p>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">You can bring us to your Location</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Besides existing collaborators, CyberTeck Academy teams up with more: Private Schools, Churches,
                                                                 Home School Groups, Sport Leagues or Parks & Rec Centers to meet your needs. Recommend us and we’ll make it happen.</p>
                                                        </div>
                                                    </li>


                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">We believe in your children </a>
                                                        <div class="uk-accordion-content">
                                                            <p>We know the future will require programming abilities. We want to bring 
                                                                our contribution to schools’ efforts in delivering a useful education for
                                                                 the world of tomorrow.</p>
                                                        </div>
                                                    </li>
                                  </ul>
                                  </div>{/*accordion ends here*/}

                              </div>

                              <div className="uk-width-1-2@s uk-margin-large-top">
                                 <div>
                                     <img src={img_location} uk-scrollspy="cls: uk-animation-scale-up; repeat: true"/>
                                 </div>
                              </div>
                  </div>
             
     






                                           {/*Amazing Teachers*/}
                                                
               <div className="uk-container  uk-margin-large-top uk-padding  uk-margin-small-bottom">
                    <div className="uk-width-1-1 ">
                    <h5 className="uk-text-center smallTextTopHeader uk-text-small">Expert Teachers for future Tech experts</h5>
                    <h3  className="header1 withPaddingLarge" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">Accelerate your child’s path to a
           future tech savvy with top  <span className="greenText">Teachers</span></h3>
                    <p className="subText uk-text-center  uk-padding withPaddingLarge">Our teachers put their passion where their expertise is. Selected from tech universities, IT experts
                                                      are here to awaken your child’s interest in the world of Tech. Fun is contagious and students build critical thinking, design abilities and creativity under the right guidance.</p>
              </div>



                        <div className="uk-grid uk-padding" data-uk-grid>
                              <div className="uk-width-1-2@s ">
                              <div className="uk-margin-medium-top@s">
                               
                                <h5  className=" " uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">Dedicated teachers inspire young minds and  <span className="greenText">
                                build a creative hub </span>   </h5>
                                <p className="subText uk-text-left paddingRight ">Top teachers, the right approach and an open attitude to learning are the 
                                ingredients that promise results in school.</p>
                                    
                                <div class="uk-flex">
                                        <div class="iconCheck"><img src= {check} /></div>
                                        <div class="iconHeader uk-margin-left"><p>Recruited from top tech universities like MIT or NYU</p></div>
                                        
                                </div>
                                

                                <div class="uk-flex">
                                        <div class="iconCheck"><img src= {check} /></div>
                                        <div class="iconHeader uk-margin-left "><p>USA-based teachers selected after extensive background checks</p></div>
                                        
                                </div>



                                <div class="uk-flex">
                                        <div class="iconCheck"><img src= {check} /></div>
                                        <div class="iconHeader uk-margin-left"><p>Deliver results with proven teaching methods for all students</p></div>
                                        
                                </div>


                                <div class="uk-flex">
                                        <div class="iconCheck"><img src= {check} /></div>
                                        <div class="iconHeader uk-margin-left"><p>Know how to connect to students and develop their creative curiosity</p></div>
                                        
                                </div>

                                </div>
                              </div>

                              <div className="uk-width-1-2@s ">
                                    <div className="imgDiv uk-margin-medium-top" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                                        <img src={teachers_img}  class="vert-move"/> 
                                    </div>
                              </div>
                        </div>
               </div>







            
             
             </div>

             </div>
    )
}
