import react from 'react'
import badge1 from "./../../../images/badge1.png"
import badge2 from "./../../../images/badge2.png"
import badge3 from "./../../../images/badge3.png"
import bIcon from './../../../images/bIcon22.png'
import schoolLocation from './../../../images/courses-at-school-location-icon.png'
import VSG from './../../../images/virtualSG.png'


const Second_Pane = () => {

      return(
          <section className="CCDesignImg">
          <div className="uk-container">
                    <div className="uk-width-1-1 uk-flex uk-flex-center">
                        <div className="introDivCC uk-padding">
                            <h5 className="header5 uk-text-center uk-padding-small">
                                CyberTeck Academy brings you immersive computer courses
                                 to boost your child’s tech skills. A bubbling creative 
                                 hub to advance abilities and share experiences with friends.
                            </h5>  


                            <div className="uk-grid-medium" data-uk-grid>


                                <div className="uk-width-1-3@s">
                                     <div className=" uk-grid-small"  data-uk-grid>
                                         <div className="uk-width-1-4">
                                               <img src={badge1} className="iconCC"      uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/>
                                         </div>   

                                         <div className="uk-width-3-4">
                                            <h5 className="iconHeaderSmall">Personalized Learning</h5>
                                               <p className="iconParagraphSmall"  uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                                                   Tailored learning program for each
                                                student, adapted courses and scheduling options
                                                </p>
                                         </div>  
                                     </div>
                                </div>


                                <div className="uk-width-1-3@s">
                                     <div className=" uk-grid-small"  data-uk-grid>
                                         <div className="uk-width-1-4">
                                               <img src={badge2}  className="iconCC"     uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/>
                                         </div>   

                                         <div className="uk-width-3-4 ">
                                            <h5 className="iconHeaderSmall" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Qualified Teachers</h5>
                                               <p className="iconParagraphSmall" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Expertise and passion to empower 
                                                                  young minds, develop their creativity and shape futures
                                                </p>
                                         </div>  
                                     </div>
                                </div>




                                <div className="uk-width-1-3@s">
                                     <div className=" uk-grid-small"  data-uk-grid>
                                         <div className="uk-width-1-4">
                                               <img src={badge3}  className="iconCC"   uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/>
                                         </div>   

                                         <div className="uk-width-3-4">
                                            <h5 className="iconHeaderSmall" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                                                     Over 10 years Experience</h5>
                                               <p className="iconParagraphSmall" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                                                   A long history in maximizing students’ 
                                               potential and helping them develop their natural talents
                                                </p>
                                         </div>  
                                     </div>
                                </div>

                            </div>
                           
                        </div>
                  </div> 



                  <div className="uk-width-1-1 uk-flex uk-flex-center">
                        <div className="mediumContainer uk-padding">
                            <h1 className="header1 uk-text-center uk-padding-small">
                            Experiences to <span className="greenText"> choose </span> from
                               </h1>  


                            
                               <div class="uk-flex uk-flex-center">
                                                <div class="VirTechBg" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                                   
                                                          <div className="uk-flex uk-flex-center ">
                                                               <img src={bIcon}  className="icon uk-margin-small-top"/>
                                                          </div>
                                                        <div className="uk-text-center ">
                                                             <h4 className="iconHeaderBold light uk-text-center uk-margin-small-top">  Virtual Tech Camp</h4>
                                                               <p  className="iconParagraphSmall light">Tailored program adapted to Student's knowledge and pace. Fast and effective</p>
                                                        </div>
                                                </div>


                                                <div class="virtualSmallBg uk-margin-left" uk-scrollspy="cls: uk-animation-slide-left-small; repeat: true">

                                                     <div className="uk-flex uk-flex-center ">
                                                               <img src={VSG}  className="icon uk-margin-small-top"/>
                                                          </div>
                                                        <div className="uk-text-center ">
                                                             <h4 className="iconHeaderBold light uk-text-center uk-margin-small-top"> At School Locations</h4>
                                                               <p  className="iconParagraphSmall light">
                                                             Fun tech courses to design game projects together with friends. Share and challenge</p>
                                                        </div>
                                                </div>


                                                <div class="atLocationBg uk-margin-left" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">

                                                            <div className="uk-flex uk-flex-center ">
                                                                    <img src={schoolLocation}  className="icon uk-margin-small-top"/>
                                                                </div>
                                                            <div className="uk-text-center">
                                                                    <h4 className="iconHeaderBold light uk-text-center uk-margin-small-top"> At School Locations</h4>
                                                                    <p  className="iconParagraphSmall light">Choose a location near you to experience tech education on your own terms. Convenient and safe</p>
                                                            </div>
                                                            </div>
                                                         
                                        </div>
                           
                        </div>
                  </div> 





          </div>
          </section>
      );
}

export default Second_Pane;
