import "./../homepage.css"
import {
    PageBlock, PrimaryText, BodyText, PrimaryButtonOutlined
} from "../../../features/Atoms"
import {
    Grid
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import intro_pics from "./../../../images/intro_pics.png"
import virtualTutoring from "./../../../images/virtualTutoring.png"
import stats1 from "./../../../images/stats1.png";
import stats2 from "./../../../images/stats2.png";
import stats3 from "./../../../images/stats3.png";
import stats4 from "./../../../images/stats4.png";
import { Link } from "react-router-dom";


const TechWideWorldBlock = () => (
        
    <section className="bgTechBlock   uk-padding-small">
          <div className="uk-container">
                        <div className="uk-grid" data-uk-grid>
                            <div className="uk-width-1-2@s">
                                    <div className="uk-margin-large-top">
                                    <h5 className=" smallTextTopHeader  uk-text-small">EVERYTHING IN CYBERTECK</h5>
                                    <h3  className="header1 " uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">Learn about <span className="greenText">CyberTeck </span> Academy</h3>
                                    <p className="subText  paddingRight ">Cyberteck Academy offers cutting-edge Computer and Design courses for video
                                    games and Tutoring Services for young students.</p>

                                    <p className=" subText paddingRight uk-text-left">Our tutoring services in the form of Learning Pods. 1-on-1 and group Tutoring service in Math & English
                                            target K-8 students.We designed our Learing Podwith you in mindhomework assistance, flexible in terms 
                                            of scheduling and perticipants. We provide undivided attention and a collablrative medium with other classmates.</p>
                                    </div>

                                    
                                <div class="uk-flex uk-margin-medium-top">
                                      <Link to="/about-us" > <div class="btn" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Learn More</div> </Link>
                                        
                                    </div>
                            </div>

                            <div className="uk-width-1-2@s">
                                <div className="uk-margin-large-top" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                                    <img src={intro_pics}  />
                                </div>

                                
                            </div>
                        </div>



                                                             
                     <div className="withMarginLarge uk-padding-top uk-visible@s  counterContainer uk-margin-large-top" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                        <div className="uk-grid " data-uk-grid>
                            
                                <div className="uk-width-1-4@s ">
                                     <div className="imgCenter">
                                         <img src={stats1} class="statsImg"/>
                                     <p className="counterText uk-text-center">Increase in academic results</p>
                                        </div>
                                </div>

                                <div className="uk-width-1-4@s">
                                      <div className="imgCenter">
                                      <img src={stats4} class="statsImg"/>
                                      <p className="counterText uk-text-center">Tech hours completed</p>
                                        </div>
                                      </div>

                                <div className="uk-width-1-4@s">
                                     <div className="imgCenter">
                                     <img src={stats2}  class="statsImg"/>
                                     <p className="counterText uk-text-center">Students with basic tech skills are 92% more likely to get a degree</p>
                                        </div>
                                    </div>


                                <div className="uk-width-1-4@s">
                                    <div className="imgCenter">
                                    <img src={stats3}  class="statsImg"/>
                                     <p className="counterText uk-text-center">Satisfaction Rate</p>
                                        </div>
                                    </div>
                            
                        </div>
                     </div>


                     <div className="uk-hidden@s counterContainer uk-padding-bottom uk-margin-bottom uk-margin-large-top" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                     <div className="uk-grid  " data-uk-grid>
                            
                              <div className="uk-width-1-2">
                                 <div className="imgCenter">
                                   <img src={stats1}  class="statsImg"/>
                                  <p className="counterText uk-text-center">Increase in academic results</p>
                                    </div>
                              </div>

                              <div className="uk-width-1-2">
                                 <div className="imgCenter">
                                   <img src={stats4}  class="statsImg"/>
                                  <p className="counterText uk-text-center">Tech hours completed</p>
                                    </div>
                              </div>
                        
                    </div>



                    <div className="uk-grid uk-margin-remove-top" data-uk-grid>
                            
                            <div className="uk-width-1-2">
                               <div className="imgCenter">
                                 <img src={stats2}  class="statsImg"/>
                                <p className="counterText uk-text-center">Students with basic tech skills are 92% more likely to get a degree</p>
                                  </div>
                            </div>

                            <div className="uk-width-1-2">
                               <div className="imgCenter">
                                 <img src={stats3}  class="statsImg"/>
                                <p className="counterText uk-text-center">Satisfaction Rate</p>
                                  </div>
                            </div>
                      
                  </div>








                     </div>



                     


                     
         <div className=" uk-margin-bottom ">
 <div className="uk-grid" data-uk-grid>
                          <div className="uk-width-1-2@s">

                                <div className="uk-margin-xlarge-top " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                                <img src={virtualTutoring}  />
                               </div>
                           </div>

                  <div className="uk-width-1-2@s">
                  
                              <div className="uk-margin-xlarge-top">
                                <h5 className=" smallTextTopHeader  uk-text-small">VIRTUAL TUTORING</h5>
                                <h3  className="header1 " uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">Upgrade Your Skills  <span className="greenText">Upgrade
                                Your Life </span> Academy</h3>
                                <p className="subText uk-text-left paddingRight ">Cyberteck Academy offers cutting-edge Computer and Design courses for video
                                games and Tutoring Services for young students.</p>

                                <p className="uk-text-left subText paddingRight uk-text-left">Our tutoring services in the form of Learning Pods. 1-on-1 and group Tutoring service in Math & English
                                        target K-8 students.We designed our Learing Podwith you in mindhomework assistance, flexible in terms 
                                        of scheduling and perticipants. We provide undivided attention and a collablrative medium with other classmates.</p>
                                </div>

                    
                           <div class="uk-flex uk-margin-medium-top">
                          <div class="btn" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Learn More</div>
                        
                      </div>
                   
                     </div>
             </div>
         </div>




















          </div>

    </section>
);

export default TechWideWorldBlock;