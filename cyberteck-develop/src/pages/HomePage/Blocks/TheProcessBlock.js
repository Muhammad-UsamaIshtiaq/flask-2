
import {
    PageBlock, PrimaryText, BodyText, SecondaryText
} from "../../../features/Atoms"
import {
    Grid, Box
} from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import landing_bg3_half1 from "./../../../images/landing_bg3_half1.png"
import connect_pic from "./../../../images/connect.png"
import process1 from "./../../../images/process1.png"
import process2 from "./../../../images/process2.png"
import process3 from "./../../../images/process3.png"
import process4 from "./../../../images/process4.png"



const TheProcessBlock = () =>{

    return(
       <section className="theProcessBg">
           <div class="uk-container uk-margin-medium-bottom">
               
                <div className="">
                     <div className="uk-width-1-1 uk-padding@s">
          
                      <h5 className="uk-text-center smallTextTopHeader uk-text-small">THE PROCESS</h5>
                      <h3  className="header1 withPaddingLarge" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">How It <span className="greenText">Works</span></h3>
                      <p className="subText  uk-text-center">We organised a few easy steps for you to sign up and join our tech savvy group</p>
                     </div>


                          <div className="uk-grid  uk-child-width-1-4@s uk-margin-large-top dirBg" data-uk-grid>
                              <div className="uk-padding"> 
                                  <img src={process1}  uk-scrollspy="cls: uk-animation-slide-top; repeat: true" className="procImg"/>
                                  <h4 className="iconHeaderSmall uk-text-center">Register With Us</h4>
                                  <p className="iconParagraphSmall  uk-text-center">Create an account with just a few clicks</p>
                              </div>


                              <div  className="uk-margin-top uk-padding">  
                                  <img src={process2}  uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true" className="procImg"/>
                                  
                                  <h4 className="iconHeaderSmall uk-text-center">Search Course</h4>
                                  <p className="iconParagraphSmall  uk-text-center">Browse our Computer Courses, Tech Camps & Math Tutoring</p>
                              
                               </div>


                               <div  className="uk-padding negativeTopMarginLargeA">  
                                  <img src={process3} uk-scrollspy="cls: uk-animation-slide-top; repeat: true" className="procImg"/>
                                  
                                  <h4 className="iconHeaderSmall uk-text-center">Enroll Course</h4>
                                  <p className="iconParagraphSmall  uk-text-center">Choose your location @Schools or Park & Rec Centers or @Home Virtual</p>
                              
                               </div>


                               <div className="uk-padding negativeTopMarginLargeB">  
                                  <img src={process4} uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true" className="procImg"/>
                                  
                                  <h4 className="iconHeaderSmall uk-text-center">Learn & Enjoy</h4>
                                  <p className="iconParagraphSmall  uk-text-center">Meet your teacher and start your tech journey</p>
                              
                               </div>



                          </div>





                   </div>



              




           </div>
       </section>


    );
}








export default TheProcessBlock;