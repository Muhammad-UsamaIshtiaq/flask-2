import {
    BodyText, PageBlock, PrimaryText, TickLabels,
    HeaderBox, HeaderTitle, PrimaryButton, HeaderDescription, SecondaryText, CourseBlock
} from "./../../../features/Atoms";
import react from 'react';
import { Link } from "react-router-dom";




const First_Pane = () => {

        return (


            <div className="ComputerCourseBg">
            
            <div className="uk-container" >
            <div className="uk-grid  " data-uk-grid>
                 <div className="uk-width-3-4@s">
                      <div className="uk-margin-xlarge-top " >
                          <h1 className="header1 light withPadding" uk-scrollspy="cls: uk-animation-slide-left; repeat: true"> Experience more than playing the game. Design the game.</h1>
                          <p className="subTitleText" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Open your child’s mind to endless possibilities. We enhance their tech skills
                           with exciting game design, coding or 3D animation computer courses. Our expert teachers make sure it’s all fun. Available all year round.</p>
                      </div>

                      <div class="uk-flex withPadding " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                          <Link component={PrimaryButton} to='/coming-soon'
                               className="marginGapBottom">Free 30 MINS LESSONS
                            </Link>
                        
                      </div>
  
                 </div>

                 <div className="uk-width-1-4@s">
                     
                 </div>
            </div>
            </div>
        </div>
        )

}


export default First_Pane;