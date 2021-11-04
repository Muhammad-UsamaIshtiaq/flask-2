
import react from 'react';
import tech_img from './../../../images/online-classroom.png'
import { Link } from "react-router-dom";


const Fifth_Pane = () => (
   <div className="uk-container">
       <div className=" uk-padding" data-uk-grid>
              <div className="uk-width-1-2@s">
                  <div>
                      <img src= {tech_img } uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/>
                  </div>
              </div>

              <div className="uk-width-1-2@s">
                  <div className="uk-margin-large-top">
                          <h3 className="header3 uk-text-left" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Tech Camps at Parks & Rec Centers and School Locations Near You</h3>
                          <p className="subText" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">CyberTeck Academy partners with Parks & Rec Centers and Schools to make sure 
                              students complement their tech education.We make it easy and accessible for your kid
                            to experience fun Summer and Spring Break Camps. Check locations available and choose one 
                            that is closer to you. Go for Virtual or In-Person and start attending at partner locations near you.</p>

                            
                            <div className="uk-margin-medium-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                            <div class="btn uk-margin-top  single-btn" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Learn More</div>


                                 </div>
                  </div>
              </div>
       </div>
   </div>

);



export default Fifth_Pane