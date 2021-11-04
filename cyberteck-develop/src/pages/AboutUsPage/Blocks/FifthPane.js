import React from "react";
import iconExpert from '../../../images/iconExpert.png';
import circleImg  from '../../../images/circleImg.png';
import time_icon from '../../../images/time_icon.png'
import secured from '../../../images/secured.png'
import check from '../../../images/check.png'



const FifthtPane = () => (
    



    <div className="uk-container uk-margin-large">
    <div className="uk-grid" data-uk-grid>
          <div className="uk-width-1-2@s">
              
          <div class="uk-flex" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
              <div className="icon"><img src={iconExpert} /></div>
              <div class="uk-margin-left">
                  <div className="iconTextContainer">
                  <h5 className="iconHeader">Expert Teachers</h5>
                  <p className="iconParagraph">Dedicated educators, expert in their fields to build the right skills any child needs for their future</p>
                  </div>
            </div>

         </div>

         <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
              <div className="icon"><img src={time_icon} /></div>
              <div class="uk-margin-left">
                  <div className="iconTextContainer">
                  <h5 className="iconHeader">Personalized courses</h5>
                  <p className="iconParagraph">Every child is entitled to quality courses delivered at their own pace for their own purpose</p>
                  </div>
            </div>

         </div>


         <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
              <div className="icon"><img src={secured} /></div>
              <div class="uk-margin-left">
                  <div className="iconTextContainer">
                  <h5 className="iconHeader">Experience as guarantee</h5>
                  <p className="iconParagraph">Over 10 years spent in delivering computer courses and creating 
                  amazing tech camps experiences for our next generation</p>
                  </div>
            </div>

         </div>


          </div>

          <div className="uk-width-1-2@s " uk-scrollspy="cls: uk-animation-slide-right; repeat: true">

               <div className="imgDiv">
                   <img src={circleImg} class="vert-move"/>
                </div>
          </div>
    </div>
</div>
);


export default FifthtPane;