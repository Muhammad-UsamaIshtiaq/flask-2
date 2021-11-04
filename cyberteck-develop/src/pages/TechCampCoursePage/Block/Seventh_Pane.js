import react from 'react'

import Img_Location from './../../../images/img_at_location.png'




const Seventh_Pane = () => (

      <section className="grayBg">
     <div className="uk-container uk-padding-large ">
                              {/**mobile***/}
                        <div class="uk-flex uk-hidden@s uk-flex-column">
                            <div class="uk-card uk-card-default  uk-card-body" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                <div className="counterDivTechCamp ">
                                <h1 className="counterNumber uk-text-center greenText">500</h1>
                                <p className="subText uk-text-center bold">Satisfied Student</p>
                                </div>
                            </div>


                               <div class="uk-card uk-card-default uk-card-body uk-margin-medium-top" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                               <div className="counterDivTechCamp">
                               <h1 className="counterNumber uk-text-center deepBlue">100%</h1>
                               <p className="subText uk-text-center bold">Satisfaction Rate</p>
                               </div>
                                </div>



                            <div class="uk-card uk-card-default uk-card-body uk-margin-medium-top" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                            <div className="counterDivTechCamp">
                            <h1 className="counterNumber uk-text-center">120</h1>
                            <p className="subText bold uk-text-center">Camps</p>
                            </div>
                            </div>
                    </div>



                        {/***Desktop**/}
                        <div class="uk-flex uk-visible@s uk-flex-center@s">
                            <div class="uk-card uk-card-default  uk-card-body" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                <div className="counterDivTechCamp">
                                <h1 className="counterNumber uk-text-center greenText">500</h1>
                                <p className="subText uk-text-center bold">Satisfied Student</p>
                                </div>
                            </div>


                               <div class="uk-card uk-card-default uk-card-body uk-margin-left" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                               <div className="counterDivTechCamp">
                               <h1 className="counterNumber uk-text-center deepBlue">100%</h1>
                               <p className="subText uk-text-center bold">Satisfaction Rate</p>
                               </div>
                                </div>



                            <div class="uk-card uk-card-default uk-card-body uk-margin-left" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                            <div className="counterDivTechCamp">
                            <h1 className="counterNumber uk-text-center">120</h1>
                            <p className="subText bold uk-text-center">Camps</p>
                            </div>
                            </div>
                    </div>













     </div>




        <div className="uk-margin-large-top">
                             <div className="uk-container">
                  <div className="uk-padding " data-uk-grid>
            

                    <div className="uk-width-1-2@s">
                         <div className="uk-margin-large-top">
                          <h3 className="header3 uk-text-left" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Tech Camps at Parks & Rec Centers and School Locations Near You</h3>
                          <p className="subText" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">CyberTeck Academy partners with Parks & Rec Centers and Schools to make sure 
                              students complement their tech education.We make it easy and accessible for your kid
                            to experience fun Summer and Spring Break Camps. Check locations available and choose one 
                            that is closer to you. Go for Virtual or In-Person and start attending at partner locations near you.</p>

                            
                            <div className="uk-margin-medium-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                            <div class="btn uk-margin-top  single-btn" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Learn More</div>


                                 </div>
                  </div>
              </div>




              <div className="uk-width-1-2@s">
                  <div>
                      <img src= {Img_Location } uk-scrollspy="cls: uk-animation-slide-right; repeat: true"/>
                  </div>
              </div>
           </div>
        </div>
 </div>


     </section>
)


export default Seventh_Pane