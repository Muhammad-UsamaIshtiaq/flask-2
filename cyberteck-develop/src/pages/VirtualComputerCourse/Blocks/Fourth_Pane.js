import React from "react";
import check from "./../../../images/check.png"

import secured from "./../../../images/secured.png"



const Fourth_Pane = () => (
    
   <div >
             <div className="uk-container">

                  <div className=" uk-flex uk-flex-center">
                        <div className="">
                            <h1 className="uk-text-center uk-text-bold">Choose your lesson <span className="greenText">package</span></h1>
                        </div>
                  </div>
              </div>



               <div className=" ">
                   <div className="uk-padding-large">
               <div className="uk-margin-large-bottom">
                       <div className ="uk-grid-medium" data-uk-grid>




                             {/**First Table**/}
                            <div className="uk-width-1-4@s">
                                   <div className="bundleContainer">
                                       <div className="lessonHeaderBg">
                                            <h4 className=" uk-text-center light">1 lesson <span className="uk-text-bold">per month</span></h4>
                                       </div>

                                       <div className="numberDiscDiv uk-padding-small">
                                            <div className="uk-grid-collapse" data-uk-grid>

                                                   <div className="uk-width-1-2">
                                                      <div>
                                                          <h3 className="uk-text-bold strikeText uk-text-center"><strike >65</strike></h3>
                                                      </div>
                                                   </div>

                                                   <div className="uk-width-1-2">
                                                      <div>
                                                          <h3 className=" blueText priceText uk-text-center"><span className="uk-text-bold">$59</span> <span className="uk-text-light">/ Lesson</span></h3>
                                                      </div>
                                                   </div>
                                            </div>
                                              {/***Second_div**/}
                                            <div className="uk-grid-collapse uk-margin-remove-top" data-uk-grid>
                                                
                                                <div className="uk-width-1-2">
                                                   <div>
                                                       <p className="uk-text-center smallText" > Once a month</p>
                                                   </div>
                                                </div>

                                                <div className="uk-width-1-2">
                                                   <div>
                                                       <h3 className="smallText greenBgBrder uk-text-center">Save 11% </h3>
                                                   </div>
                                                </div>
                                         </div>


                                       </div>

                                       {/***Item list container**/}
                                       <div className="uk-padding-small">
                                           <div>
                                               <p className="uk-text-bold  uk-text-center">Explore your own choice in tech</p>
                                               
                                           </div>

                                           <div className="uk-grid-collapse uk-margin-small-top uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Learn from anywhere with virtual 1-on-1 course</p>
                                                 </div>

                                           </div>

                                           <div className="uk-grid-collapse  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Many tech topics to choose from at the best rates</p>
                                                 </div>

                                           </div>


                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Exclusive attention from teacher adapted to student’s pace and knowledge </p>
                                                 </div>

                                           </div>

                                     
                                       </div>{/***Item list container ends HERE!!!!**/}



                                             {/**CTA button**/}
                                             <div className="uk-flex uk-flex-center">
                                                  <a href=""><h4 className="CTA_select_btn"> Select</h4></a>
                                             </div>

                                            


                                                  {/***SECURE**/}
                                            <div className="uk-grid-collapse uk-padding-small uk-margin-remove-top" data-uk-grid>
                                                
                                                <div className="uk-width-1-3">
                                                   <div className="uk-margin-left">
                                                       <img src= {secured}  className="iconCheck"/>
                                                   </div>
                                                </div>

                                                <div className="uk-width-2-3">
                                                   <div className="">
                                                       <p className="smallText uk-text-bold uk-text-center"> Nos risk, cancel any time </p>
                                                   </div>
                                                </div>
                                         </div>

                                   </div>
                            </div >







                           
                             {/**SECOND Table**/}
                            <div className="uk-width-1-4@s">
                                   <div className="bundleContainer">
                                       <div className="lessonHeaderBgBlue">
                                            <h4 className=" uk-text-center light">4 lessons <span className="uk-text-bold">per month</span></h4>
                                            <h4 className="negativeTopMarginSmall light uk-text-bold uk-text-center">MOST POPULAR</h4>
                                       </div>

                                       <div className="numberDiscDiv uk-padding-small">
                                            <div className="uk-grid-collapse" data-uk-grid>

                                                   <div className="uk-width-1-2">
                                                      <div>
                                                          <h3 className="uk-text-bold strikeText uk-text-center"><strike >65</strike></h3>
                                                      </div>
                                                   </div>

                                                   <div className="uk-width-1-2">
                                                      <div>
                                                          <h3 className=" blueText priceText uk-text-center"><span className="uk-text-bold">$59</span> <span className="uk-text-light">/ Lesson</span></h3>
                                                      </div>
                                                   </div>
                                            </div>
                                              {/***Second_div**/}
                                            <div className="uk-grid-collapse uk-margin-remove-top" data-uk-grid>
                                                
                                                <div className="uk-width-1-2">
                                                   <div>
                                                       <p className="uk-text-center smallText" > Once a month</p>
                                                   </div>
                                                </div>

                                                <div className="uk-width-1-2">
                                                   <div>
                                                       <h3 className="smallText greenBgBrder uk-text-center">Save 11% </h3>
                                                   </div>
                                                </div>
                                         </div>


                                       </div>

                                       {/***Item list container**/}
                                       <div className="uk-padding-small">
                                           <div>
                                               <p className="uk-text-bold  uk-text-center">Build tech fundamentals </p>
                                               
                                           </div>

                                           <div className="uk-grid-collapse uk-margin-small-top uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Learn from anywhere with virtual 1-on-1 courses </p>
                                                 </div>

                                           </div>

                                           <div className="uk-grid-collapse  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Many tech topics to choose from at the best rates</p>
                                                 </div>

                                           </div>


                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Exclusive attention from teacher adapted to student’s pace and knowledge </p>
                                                 </div>

                                           </div>

                                                    
                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Start learning coding principles </p>
                                                 </div>

                                           </div>








                                     
                                       </div>{/***Item list container ends HERE!!!!**/}



                                             {/**CTA button**/}
                                             <div className="uk-flex uk-flex-center">
                                                  <a href=""><h4 className="CTA_select_btn"> Select</h4></a>
                                             </div>

                                            


                                                  {/***SECURE**/}
                                            <div className="uk-grid-collapse uk-padding-small uk-margin-remove-top" data-uk-grid>
                                                
                                                <div className="uk-width-1-3">
                                                   <div className="uk-margin-left">
                                                       <img src= {secured}  className="iconCheck"/>
                                                   </div>
                                                </div>

                                                <div className="uk-width-2-3">
                                                   <div className="">
                                                       <p className="smallText uk-text-bold uk-text-center"> Nos risk, cancel any time </p>
                                                   </div>
                                                </div>
                                         </div>




                                   </div>
                            </div >









                           
                             {/**THIRD Table**/}
                            <div className="uk-width-1-4@s">
                                   <div className="bundleContainer">
                                       <div className="lessonHeaderBg">
                                            <h4 className=" uk-text-center light">8 lesson <span className="uk-text-bold">per month</span></h4>
                                       </div>

                                       <div className="numberDiscDiv uk-padding-small">
                                            <div className="uk-grid-collapse" data-uk-grid>

                                                   <div className="uk-width-1-2">
                                                      <div>
                                                          <h3 className="uk-text-bold strikeText uk-text-center"><strike >65</strike></h3>
                                                      </div>
                                                   </div>

                                                   <div className="uk-width-1-2">
                                                      <div>
                                                          <h3 className=" blueText priceText uk-text-center"><span className="uk-text-bold">$59</span> <span className="uk-text-light">/ Lesson</span></h3>
                                                      </div>
                                                   </div>
                                            </div>
                                              {/***Second_div**/}
                                            <div className="uk-grid-collapse uk-margin-remove-top" data-uk-grid>
                                                
                                                <div className="uk-width-1-2">
                                                   <div>
                                                       <p className="uk-text-center smallText" > Once a month</p>
                                                   </div>
                                                </div>

                                                <div className="uk-width-1-2">
                                                   <div>
                                                       <h3 className="smallText greenBgBrder uk-text-center">Save 11% </h3>
                                                   </div>
                                                </div>
                                         </div>


                                       </div>

                                       {/***Item list container**/}
                                       <div className="uk-padding-small">
                                           <div>
                                               <p className="uk-text-bold  uk-text-center">Advance in tech projects design </p>
                                               
                                           </div>

                                           <div className="uk-grid-collapse uk-margin-small-top uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Learn from anywhere with virtual 1-on-1 course</p>
                                                 </div>

                                           </div>

                                           <div className="uk-grid-collapse  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Exclusive attention from teacher adapted to student’s pace and knowledge </p>
                                                 </div>

                                           </div>


                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Best rates for tech education  </p>
                                                 </div>

                                           </div>


                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Advance your coding principles </p>
                                                 </div>

                                           </div>



                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall"> A wide range of topics and project designsn  </p>
                                                 </div>

                                           </div>

                                     
                                       </div>{/***Item list container ends HERE!!!!**/}



                                             {/**CTA button**/}
                                             <div className="uk-flex uk-flex-center">
                                                  <a href=""><h4 className="CTA_select_btn"> Select</h4></a>
                                             </div>

                                            


                                                  {/***SECURE**/}
                                            <div className="uk-grid-collapse uk-padding-small uk-margin-remove-top" data-uk-grid>
                                                
                                                <div className="uk-width-1-3">
                                                   <div className="uk-margin-left">
                                                       <img src= {secured}  className="iconCheck"/>
                                                   </div>
                                                </div>

                                                <div className="uk-width-2-3">
                                                   <div className="">
                                                       <p className="smallText uk-text-bold uk-text-center"> Nos risk, cancel any time </p>
                                                   </div>
                                                </div>
                                         </div>




                                   </div>
                            </div >







                            
                            




                            
                             {/**FOURTH Table**/}
                            <div className="uk-width-1-4@s">
                                   <div className="bundleContainer">
                                       <div className="lessonHeaderBg">
                                            <h4 className=" uk-text-center light">12 lesson <span className="uk-text-bold">per month</span></h4>
                                       </div>

                                       <div className="numberDiscDiv uk-padding-small">
                                            <div className="uk-grid-collapse" data-uk-grid>

                                                   <div className="uk-width-1-2">
                                                      <div>
                                                          <h3 className="uk-text-bold strikeText uk-text-center"><strike >65</strike></h3>
                                                      </div>
                                                   </div>

                                                   <div className="uk-width-1-2">
                                                      <div>
                                                          <h3 className=" blueText priceText uk-text-center"><span className="uk-text-bold">$59</span> <span className="uk-text-light">/ Lesson</span></h3>
                                                      </div>
                                                   </div>
                                            </div>
                                              {/***Second_div**/}
                                            <div className="uk-grid-collapse uk-margin-remove-top" data-uk-grid>
                                                
                                                <div className="uk-width-1-2">
                                                   <div>
                                                       <p className="uk-text-center smallText" > Once a month</p>
                                                   </div>
                                                </div>

                                                <div className="uk-width-1-2">
                                                   <div>
                                                       <h3 className="smallText greenBgBrder uk-text-center">Save 11% </h3>
                                                   </div>
                                                </div>
                                         </div>


                                       </div>

                                       {/***Item list container**/}
                                       <div className="uk-padding-small">
                                           <div>
                                               <p className="uk-text-bold  uk-text-center">Fastrack to tech expert level </p>
                                               
                                           </div>

                                           <div className="uk-grid-collapse uk-margin-small-top uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Learn from anywhere with virtual 1-on-1 courses</p>
                                                 </div>

                                           </div>

                                           <div className="uk-grid-collapse  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Exclusive attention from teacher adapted to student’s pace and knowledge</p>
                                                 </div>

                                           </div>


                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Best rates for tech education  </p>
                                                 </div>

                                           </div>



                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Advance your coding principles</p>
                                                 </div>

                                           </div>



                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">A wide range of topics and project designs </p>
                                                 </div>

                                           </div>


                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Mix and match your own tech topics </p>
                                                 </div>

                                           </div>


                                           <div className="uk-grid-collapse uk-margin-top-remove  uk-padding-small" data-uk-grid>
                                                <div className="uk-width-1-5">
                                                      <img src= {check} className="iconCheck" />
                                                 </div>
                                                 
                                                 <div className="uk-width-4-5">
                                                      <p className="iconParagraphSmall">Save on the best value package </p>
                                                 </div>

                                           </div>

                                     
                                       </div>{/***Item list container ends HERE!!!!**/}



                                             {/**CTA button**/}
                                             <div className="uk-flex uk-flex-center">
                                                  <a href=""><h4 className="CTA_select_btn"> Select</h4></a>
                                             </div>

                                            


                                                  {/***SECURE**/}
                                            <div className="uk-grid-collapse uk-padding-small uk-margin-remove-top" data-uk-grid>
                                                
                                                <div className="uk-width-1-3">
                                                   <div className="uk-margin-left">
                                                       <img src= {secured}  className="iconCheck"/>
                                                   </div>
                                                </div>

                                                <div className="uk-width-2-3">
                                                   <div className="">
                                                       <p className="smallText uk-text-bold uk-text-center"> Nos risk, cancel any time </p>
                                                   </div>
                                                </div>
                                         </div>




                                   </div>
                            </div >





                       </div>
                       
                    </div>
            </div>
            </div>


           

</div>
    
)


export default Fourth_Pane