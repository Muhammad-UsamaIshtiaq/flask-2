import React from "react";
import check from  '../../../images/check.png'



const SixthPane = () => (
    
    <section className="grayBg">
    <div className="uk-container uk-padding-large">
       <div className ="uk-grid" data-uk-grid>
           <div className="uk-width-1-2@s">
               <div>
                   <h3 className="header3 uk-margin-medium-top">What we do</h3>
                   <p>CyberTeck Academy brings additional education for your child to reach 
                       his best self. We help students gain essential skills, understand 
                       school better and get a passion for tech.</p>
               </div>
               
               <div className="uk-margin-large-top">
               <h3 className="header3">What we Offer</h3>

                           <div class="uk-flex uk-margin-medium-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                           <div className="iconCheck"><img src={check} /></div>
                           <div class="uk-margin-left">
                               <div className="iconTextContainer">
                              
                               <p className="iconParagraph">Tutoring courses in important and in-demand subjects for a successful academic path</p>
                               </div>
                           </div>

                          </div>

                          <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                   
                                   <p className="iconParagraph">Computer courses to help students acquire tech skills important for their future</p>
                                   </div>
                               </div>

                           </div>


                           <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                  
                                   <p className="iconParagraph">Tech Camps to keep education relevant and fun during those summer and spring breaks</p>
                                   </div>
                               </div>

                           </div>


                           <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                 
                                   <p className="iconParagraph">A team of top teachers, expert in their fields and set out to help young minds reach their potential</p>
                                   </div>
                               </div>

                           </div>

                           <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                 
                                   <p className="iconParagraph">Our promise to constantly strive for the latest relevant education</p>
                                   </div>
                               </div>

                           </div>





               </div>




           </div>

           <div className="uk-width-1-2@s ">

               <div className="mVContainer withPadding" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                   <h3 > Mision </h3>
                   <p>Our mission is to provide affordable education for the future. We want to bring our contribution to schools’
                        efforts in delivering a useful education for the world of tomorrow.</p>

                        <h3 > Vision </h3>
                   <p>Our plan for the future includes a comprehensive range of courses for additional and 
                       preparatory education to address the future and ambitious academic paths. Access to education should be easy, therefore our partner locations and product pricing are designed with that purpose in mind.</p>
                             
                             
                       <div>

                       <h3 > Core Values </h3>
                              <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                  
                                   <p className="iconParagraph">Constantly improve and adapt our products and services to be relevant and make a difference</p>
                                   </div>
                               </div>

                             </div>



                             <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                  
                                   <p className="iconParagraph">Bring the best people to our team and work together towards accomplishing our vision</p>
                                   </div>
                               </div>

                             </div>



                             <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                  
                                   <p className="iconParagraph">Open atmosphere and collaboration for our staff, teachers and parents</p>
                                   </div>
                               </div>

                             </div>





                             <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                               <div className="iconCheck"><img src={check} /></div>
                               <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                  
                                   <p className="iconParagraph">Make tech education fun and interesting to prepare the next generation of innovators</p>
                                   </div>
                               </div>

                             </div>

                       </div>
               </div>
              
           </div>

       </div>
          
      </div>
                    
</section>

) 


export default SixthPane;