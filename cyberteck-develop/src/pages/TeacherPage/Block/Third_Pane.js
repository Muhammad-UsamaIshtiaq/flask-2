import react from "react"
import TeacherPage from "../teacherPage";
import Teachers_page from "./../../../images/Teachers_page.jpg"
import img_teacher from "./../../../images/img_teacher.png"
import logos from "./../../../images/logos.PNG"
import teacher_student from "./../../../images/teacher_student.png"
import check from "./../../../images/check.png"


import relatedProgImg1 from  "./../../../images/relatedProgImg1.png"
import relatedProgImg2 from  "./../../../images/relatedProgImg2.png"
import relatedProgImg3 from  "./../../../images/relatedProgImg3.png"

const Third_Pane = () =>{
    return(

        <div>

        <div className="uk-container uk-margin-large-top">
                <div className="uk-grid" data-uk-grid>
                     <div className="uk-width-1-2@s" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                          <div>
                              <img src= {Teachers_page} />
                          </div>
                     </div>

                     <div className="uk-width-1-2@s uk-margin-large-top">
                          <div>
                              <h3 className="header3 uk-text-left" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Intensive training makes all the difference</h3>
                              <p className="uk-text-left" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Via workshops, collaborative activities, and indepth educational seassions,
                                   our instructor hone the skills needed to bring our safe, fun and inclusive 
                                   culture of life. Wheather you choose an online or on-campus program, you 
                                   can rest assured that your child's instructor is thoroughly trained to teach and inspire.</p>
                          </div>
                     </div>
                </div>




                <div className="uk-grid uk-margin-small-bottom uk-margin-xlarge-top" data-uk-grid>
            
                     <div className="uk-width-1-2@s uk-margin-large-top">
                          <div>
                              <h3 className="header3 uk-text-left" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">CyberTech Small group class Guarantee</h3>
                              <p className="uk-text-left" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                                                    We understand the impact of individual attention. At iD Tech, 
                                                    your child will never get lost in the suffle. With small classes 
                                                    guaranteed (average of just 5 students per instructor),our staff is in tune with your child's unique needs.</p>
                          </div>
                     </div>



                     <div className="uk-width-1-2@s" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                          <div>
                              <img src= {img_teacher} />
                          </div>
                     </div>
                </div>



                </div>



             <div className="circleBg">
                  <div className="uk-container">
                   <div className=" uk-margin-xlarge-top">
                   <div className="uk-grid" data-uk-grid>
                     <div className="uk-width-1-2@s" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                          <div>
                              <img src= {logos} />
                          </div>
                     </div>

                     <div className="uk-width-1-2@s uk-margin-large-top">
                          <div>
                              <h3 className="header3 uk-text-left" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">They hire who we hire</h3>
                              <p className="uk-text-left" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Technical prowess. Inspirational leadership. Incredible personalities. 
                              it's no surprise that iconic companies like Google, EA, Microsoft and Disney hire the same talent we do. 
                              Our people possess the whole package of skills that top employers seek.</p>
                          </div>
                     </div>
                </div>
                   </div>
                   </div>
           
                   </div>



                   <div className = "uk-container uk-margin-xlarge-top" >
                       <div className="uk-grid" data-uk-grid>
                             <div className="uk-width-1-2@s">
                                   <div className="" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                                      <img src = {teacher_student} />
                                   </div>
                             </div>

                             <div className="uk-width-1-2@s">
                                   <div>
                                       

                                   <div className="uk-margin-large-top">
                               
                               <h3  className=" " uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">Backed by best support in the industry <span className="greenText">
                               build a creative hub </span>   </h3>
                               <p className="subText uk-text-left paddingRight "  uk-scrollspy="cls: uk-animation-; repeat: true">An instructor is only as good as their support system.
                                our stuff backed by:</p>
                                   
                               <div class="uk-flex">
                                       <div class="iconCheckT"><img src= {check}  uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/></div>
                                       <div class="iconHeader uk-margin-left"  uk-scrollspy="cls: uk-animation-slide-right; repeat: true"><p className="uk-text-light">A full-time carriculum development team.</p></div>
                                       
                               </div>
                               

                               <div class="uk-flex">
                                       <div class="iconCheckT"><img src= {check}  uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/></div>
                                       <div class="iconHeader uk-margin-left  " uk-scrollspy="cls: uk-animation-slide-right; repeat: true"><p className="uk-text-light">A global team of Regional Managers.</p></div>
                                       
                               </div>



                               <div class="uk-flex">
                                       <div class="iconCheckT"><img src= {check}  uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/></div>
                                       <div class="iconHeader uk-margin-left"  uk-scrollspy="cls: uk-animation-slide-right; repeat: true"><p className="uk-text-light">A culture of open communication and positive reinforcement</p></div>
                                       
                               </div>


                               <div class="uk-flex">
                                       <div class="iconCheckT"><img src= {check}  uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/></div>
                                       <div class="iconHeader uk-margin-left"  uk-scrollspy="cls: uk-animation-slide-right; repeat: true"><p className="uk-text-light"> The best learning management system, iD game Plan</p></div>
                                       
                               </div>



                               <div class="uk-flex">
                                       <div class="iconCheckT"><img src= {check}  uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/></div>
                                       <div class="iconHeader uk-margin-left"  uk-scrollspy="cls: uk-animation-slide-right; repeat: true"><p className="uk-text-light">  The latest hardware and software.</p></div>
                                       
                               </div>

                               </div>
                                   </div>
                             </div>
                       </div>


                   </div>




                   <div className="uk-container uk-margin-large-top">
                           <div className="uk-width-1-1">
                               <div className="uk-flex-center uk-flex">
                                  <div className="mediumContainer">
                                      <h1 className="header1 uk-text-center">Now that you have met our staff, you're ready to get started!</h1>
                                      <h5 className="uk-text-center">Choose the perfect program for your child.</h5>
                                  </div>
                                  </div>
                           </div>

                     <div className="uk-flex uk-flex-center">
                    <div className="">
                    <div className=" uk-margin-large-bottom uk-margin-large-top" data-uk-grid> 
                         <div className="uk-width-1-3@s">
                              <div className="">
                                  <img src={relatedProgImg1} uk-scrollspy="cls: uk-animation-slide-left; repeat: true" />
                                  <h4 className="imgHeader  uk-text-center">Virtual Tech Camp</h4>
                                  <p className="subText  withPadRightLeft uk-text-center" >  Take advantage of time off school to build coveted tech skills </p>
                                       
                                  <div class="uk-flex uk-flex-center ">
                                 <div class="btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Learn More</div>
                        
                                 </div>
                                     </div>
                         </div>


                         <div className="uk-width-1-3@s">
                                    <div>
                                        <img src={relatedProgImg2} uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/>
                                        <h4 className="imgHeader  uk-text-center">Small Group Courses</h4>
                                            <p className="subText  withPadRightLeft uk-text-center" > Join other tech savvys to challenge each other and advance together </p>
                                        
                                            <div class="uk-flex uk-flex-center ">
                                            <div class="btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Learn More</div>
                                    
                                            </div>
                                         </div>
                         </div>






                         <div className="uk-width-1-3@s">
                             <div>
                                <img src={relatedProgImg3}  uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/>
                                <h4 className="imgHeader  uk-text-center"> 1-on-1 Virtual Courses</h4>
                                  <p className="subText  withPadRightLeft uk-text-center" > Enjoy exclusive personalized courses for a fast track to performance </p>
                                  <div class="uk-flex uk-flex-center ">
                                 <div class="btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Learn More</div>
                        
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


export default Third_Pane;