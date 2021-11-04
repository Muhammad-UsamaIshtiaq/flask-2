import { useEffect, useState } from "react";
import './../atLocationPage.css';
import ContactModal from './../../../features/ContactModal'
import {
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryButton, PrimaryText, SecondaryText
} from "./../../../features/Atoms"



const First_pane = () => {
    const [contactModalStatus, setContactModalStatus] = useState(false);
     return (
        

         <div className="atLocationHeaderBg">

            <div className="uk-container uk-margin-xlarge-top">

                <div className="uk-grid" data-uk-grid>

                    <div className="uk-width-2-3@s">

                        <div>      
                         <h1 className="header1 light  uk-text-left"
                          uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Partnering with schools to shape young minds into future tech savvys</h1>
                             </div>

                             <div class="uk-flex withPadding ">

                                 <div> <PrimaryButton onClick={() => setContactModalStatus(true)} style={{ padding: 10 }} rounded>1 hr Free Discovery Lesson</PrimaryButton></div>
                        {/*<div onClick={() => setContactModalStatus(true)} class="btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Choose Location</div> */}
                        
                      </div>
                    </div>

                    
                  

                    <div className="uk-width-1-3@s">
                        
                    </div>
                </div>

             </div>

             <ContactModal open={contactModalStatus} handleClose={() => setContactModalStatus(false)} />

         </div>
         
     )



}





export default First_pane ;