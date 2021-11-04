import react from 'react';
import bIcon from './../../../images/bIcon2.png'
import schoolLocation from './../../../images/courses-at-school-location-icon.png'






const Second_Pane = () => (

            <section className="uk-margin-xlarge-bottom">
                    <div className="uk-grid-collapse uk-grid" data-uk-grid>
                         <div className="uk-width-1-2@s">
                             <div className="techCampGrayBg uk-padding-large">
                                      <h3 className="header3 uk-text-center uk-padding normalPaddingLR">Pick your Camp and choose your ground</h3>
                                      <div className="negativeDiv normalPaddingLR">   
                                      <p className="uk-text-center subTextSmall "> Choose the option that fits you best: Virtual from at home or
                                           at Location School and Parks & Rec Centers </p>
                                        </div>


                                        <div class="uk-flex uk-flex-center">
                                                <div class="VirTechBg" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                                   
                                                          <div className="uk-flex uk-flex-center ">
                                                               <img src={bIcon}  className="icon uk-margin-medium-top"/>
                                                          </div>
                                                        <div className="uk-flex uk-flex-center ">
                                                             <h4 className="iconHeaderBold light uk-text-center uk-margin-small-top">  Virtual Tech Camp</h4>
                                                               
                                                        </div>
                                                </div>


                                                <div class="atLocationBg uk-margin-left" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">

                                                     <div className="uk-flex uk-flex-center ">
                                                               <img src={schoolLocation}  className="icon uk-margin-medium-top"/>
                                                          </div>
                                                        <div className="uk-flex uk-flex-center ">
                                                             <h4 className="iconHeaderBold light uk-text-center uk-margin-small-top"> At School Locations</h4>
                                                               
                                                        </div>
                                                </div>
                                                         
                                        </div>

                                    </div>
                         </div>

                         <div className="uk-width-1-2@s">
                             <div className="studentBg">
                                   
                           
                             
                            </div>
                         </div>
                    </div>
            </section>    
);



export default Second_Pane;