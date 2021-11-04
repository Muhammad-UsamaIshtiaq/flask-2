import react from "react";
import inter from "./../../../images/inter.png"
import ass2 from "./../../../images/ass2.png"
import ass from "./../../../images/ass.png"

const Second_Pane = () => {

    return (
        <section className="trainingProgBg">
            <div className="uk-container">
               <div className="uk-width-1-1">
                    <div className="uk-flex uk-flex-center">
                               <div className="mediumContainer">
                                    <h3 className="uk-text-center uk-text-bold  header3"  uk-scrollspy="cls: uk-animation-fade; repeat: true">Our Intensive Hiring Process </h3>
                                    <p className="uk-text-center" uk-scrollspy="cls: uk-animation-fade; repeat: true">We recruit our stuff from the same prestigious universities where we host our programs 
                                        (Caltech, CMU, NYU, and more). Our quality assurance processes assure consistancy
                                        across all programs worldwide. Our staff is our brand.
                                        </p>
                             </div>
                    </div>
               </div>

                 

                 <div className="uk-margin-large-top uk-flex uk-flex-center ">
                     <div className="mediumContainerLarge">
               <div className="uk-grid-medium " data-uk-grid>
                          <div className="uk-width-1-3@s" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <div className="uk-flex uk-flex-center">
                                          <img src={inter} />
                                      </div>
                                      <div>
                                              <h6 className="uk-text-center uk-margin-small-top uk-text-bold">Rigorous Interviews</h6>
                                              <p className="uk-text-center iconParagraphSmall">Applicants undergo a meticulous interview process conducted by our team of 40 Regional Manager</p>
                                      </div>                                       
                                </div>
                         </div>


                         <div className="uk-width-1-3@s uk-margin-large-top" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <div className="uk-flex uk-flex-center">
                                          <img src={ass} />
                                      </div>
                                      <div>
                                              <h6 className="uk-text-center uk-margin-small-top uk-text-bold">Selecting the best of the best</h6>
                                              <p className="uk-text-center iconParagraphSmall">Out of thousands of applicants anually, only the very best go on to wear the iD Tech badge.</p>
                                      </div>                                       
                                </div>
                         </div>


                         <div className="uk-width-1-3@s" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                    <div className="uk-card uk-card-default uk-card-body">
                                        <div className="uk-flex uk-flex-center">
                                          <img src={ass2} />
                                      </div>
                                      <div>
                                              <h6 className="uk-text-center uk-margin-small-top uk-text-bold">Rigorous Interviews</h6>
                                              <p className="uk-text-center iconParagraphSmall">Applicants undergo a meticulous interview process conducted by our team of 40 Regional Manager</p>
                                      </div>                                       
                                </div>
                         </div>


                     </div>

                  </div>

              </div>


                </div>

                  






        </section>
    )
}


export default Second_Pane;