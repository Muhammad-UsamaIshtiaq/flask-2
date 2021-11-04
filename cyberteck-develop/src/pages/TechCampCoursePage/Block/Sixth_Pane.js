import React from "react";


const Sixth_Pane = () => (

     <section className="uk-margin-xlarge-top  accBgTechCamp">
             <div className="uk-container">
                 <div className=" uk-margin-large-top  ">
                   <div className="" data-uk-grid>
                        <div className="uk-width-1-2@s">
                            <h3 className="header3  uk-margin-top  uk-text-left light">Why go for our innovative Tech Camps</h3>
                                <p className ="subText   uk-text-left  light">We know how to light up the imagination of young minds 
                                and train essential skills useful for any future tech savvy.</p>


                               {/**Accordion**/}
                               <div className="accordionContainer whiteBg  uk-margin-large-bottom uk-margin-large-top">
                                   <div  className="">
                                  <ul uk-accordion="collapsible: false" >
                                                    <li uk-scrollspy="cls: uk-animation-fade4; repeat: true">
                                                        <a class="uk-accordion-title accHeader" href="#">Comprehensive tech curricula</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Design own projects and mods and dive into the world of gaming and animation
                                                                 in everything from Minecraft and Scratch to Python and Roblox.</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Organize your schedule and your time</a>
                                                        <div class="uk-accordion-content">
                                                            <p>School free weeks can be fun and useful. You decide when and how often your child 
                                                                joins their friends at fun tech camp.</p>
                                                        </div>
                                                    </li>
                                               

                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Choose from our partners schools</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Choose from our available locations to experience camp time with friends at Schools
                                                                 and Parks & Rec Centers, with Virtual or In-Person options.</p>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Go virtual for ultimate mobility</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Develop critical thinking abilities at your own pace, in your own time, at home
                                                                 with Virtual Tech Camp options.</p>
                                                        </div>
                                                    </li>


                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Spring Break and Summer courses to boost school studies </a>
                                                        <div class="uk-accordion-content">
                                                            <p>Take advantage of Spring and Summer breaks to bring your child two steps ahead in school. They develop
                                                                 problem solving abilities and critical thinking and make up for the past year in tech education..</p>
                                                        </div>
                                                    </li>


                                                    
                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Share the camp experience with friends</a>
                                                        <div class="uk-accordion-content">
                                                            <p>The best part about learning tech and designing your own project is getting to 
                                                                share it with friends. Challenge each other and advance together.</p>
                                                        </div>
                                                    </li>
                                  </ul>
                                  </div>
                                  </div>{/*accordion ends here*/}






                        </div>

                        <div className="uk-width-1-2@s">
                           
                        </div>
                        </div>
                   </div>
             </div>
     </section>
)


export default Sixth_Pane