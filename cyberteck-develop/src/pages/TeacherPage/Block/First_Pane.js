import react from 'react';
import { Link } from "react-router-dom";
import './../teachers.css'



const First_Pane = () => (
         <div className="">
    <div className="teachersPageBg">
            
    <div className="uk-container " >
    <div className="uk-grid  " data-uk-grid>
         <div className="uk-width-3-4@s">
              <div className="uk-margin-xlarge-top " >
                  <h1 className="header1 light withPadding" uk-scrollspy="cls: uk-animation-slide-left; repeat: true"> Learn from tech rockstars</h1>
                  <p className="subTitleText" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Software engineers from Carnegia Mellon. Industry disruptors 
                  from Caltech. Digital artists from NYU. Our elite educators give your child a serious edge for college and future careers.</p>
              </div>

              <div class="uk-flex withPadding ">
                 <Link to="/courses"><div class="btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Find Your Perfect Program </div> </Link>
                
              </div>

         </div>

         <div className="uk-width-1-4@s">
             
         </div>
    </div>
    </div>
</div>


          <div className="uk-container">
              <div className="uk-width-1-1">
                <div className="uk-flex uk-flex-center">
                     <div className="introDivTT uk-padding">
                            <h3 className="header3 uk-text-center"> The right instructor changes everything </h3>
                            <p className="uk-text-center">Passion for tech. Unmatched experties. Personality that 
                                brings out the absolute best in your child. With 20+ years 
                                of experience, we know their no replacement for the best teacher.
                                 That's why we hire elite, all-adult educators and recruit the 
                                 same carefully-vetted talent sought by companies like Google, EA, 
                                 Tesla and Disney. They hire who we hire.</p>
                     </div>
                </div>
              </div>

          </div>



</div>
);


export default First_Pane