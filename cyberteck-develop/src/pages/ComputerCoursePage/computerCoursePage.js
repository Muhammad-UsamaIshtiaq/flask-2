import {
    BodyText, PageBlock, PrimaryText, TickLabels,
    HeaderBox, HeaderTitle, PrimaryButton, HeaderDescription, SecondaryText, CourseBlock
} from "../../features/Atoms";
import Layout from "../Layout";
import { Grid, Box, Paper, CardMedia, Card, CardContent, Divider, Hidden, Typography } from "@material-ui/core";

import computer_courses_icon from "./../../images/computer-courses-icon.png"
import tech_camps_icon from "./../../images/tech-camps-icon.png"
import courses_at_school_location_icon from "./../../images/courses-at-school-location-icon.png"
import indexImg from "./../../images/Indexbackground.jpg";
import CertifiedTeacherBlock from "./../HomePage/Blocks/AmazingTeachersBlock";
import indexBg from "./../../images/indexBg.jpg"
import whychooseicon5 from "./../../images/whychooseicon5.png"
import Teachers_page from "./../../images/Teachers_page.jpg"
import teacher_lap from "./../../images/ty-860x573.jpg"
import Teachers_page2 from "./../../images/Teachers_page2.jpg"
import blog3 from "./../../images/blog3-585x390.png"
import best_selection from "./../../images/best_selection.png"
import indepth_ass from "./../../images/indepth_ass.png"
import interviews from "./../../images/interviews.png"
import staff from "./../../images/discovery_Bg_small.jpg"
import logos from "./../../images/logos.PNG"
import logoBack from "./../../images/logo-back.PNG"
import { Link } from "react-router-dom";
import { CourseTypeButton } from "../HomePage/Blocks/CourseTypesBlock";
import EliteTeachersBlock from "../CourseDetailsPage/Blocks/EliteTeachersBlock"
import TestimonialBlock from "../HomePage/Blocks/TestimonialBlock";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllCourse } from "../../DataStore/CourseReducer";
import Api from "../../Api";
import Data from "../../Data";
import cs_video2 from "./../../images/cs_video2.png"
import badge1 from "./../../images/badge1.png"
import badge2 from "./../../images/badge2.png"
import badge3 from "./../../images/badge3.png"


import './computerCoursePage.css'
import bIcon from './../../images/bIcon22.png'
import schoolLocation from './../../images/courses-at-school-location-icon.png'
import VSG from './../../images/virtualSG.png'
import onlineClassroom from './../../images/online-classroom.png'
import check from './../../images/check.png'
import modsPprojects from './../../images/mods_projects.png'
import increase from './../../images/increase.png'
import increase2 from './../../images/increase2.png'




export default function ComputerCoursePage(props) {
    const courseListStatus = useSelector(state => state.course.loadAllCourse)
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (!mounted) {
            dispatch(loadAllCourse({
                courseCategory: [Data.Config.CourseCategory.COMPUTER_COURSE.id]
            }));
            setMounted(true)
        }
    }, [])

    return (
        <Layout>
                  {/**First Pane**/}
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
        </div>  {/**END of First Pane**/}
       
       
       
          
          
         {/**SECOND PANE**/}
           <section className="CCDesignImg">
             <div className="uk-container">
                      
             <div className="uk-width-1-1 uk-flex uk-flex-center">
                        <div className="introDivCC uk-padding">
                            <h5 className="header5 uk-text-center uk-padding-small">
                                CyberTeck Academy brings you immersive computer courses
                                 to boost your child’s tech skills. A bubbling creative 
                                 hub to advance abilities and share experiences with friends.
                            </h5>  


                            <div className="uk-grid-medium" data-uk-grid>


                                <div className="uk-width-1-3@s">
                                     <div className=" uk-grid-small"  data-uk-grid>
                                         <div className="uk-width-1-4">
                                               <img src={badge1} className="iconCC"      uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/>
                                         </div>   

                                         <div className="uk-width-3-4">
                                            <h5 className="iconHeaderSmall">Personalized Learning</h5>
                                               <p className="iconParagraphSmall"  uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                                                   Tailored learning program for each
                                                student, adapted courses and scheduling options
                                                </p>
                                         </div>  
                                     </div>
                                </div>


                                <div className="uk-width-1-3@s">
                                     <div className=" uk-grid-small"  data-uk-grid>
                                         <div className="uk-width-1-4">
                                               <img src={badge2}  className="iconCC"     uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/>
                                         </div>   

                                         <div className="uk-width-3-4 ">
                                            <h5 className="iconHeaderSmall" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Qualified Teachers</h5>
                                               <p className="iconParagraphSmall" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Expertise and passion to empower 
                                                                  young minds, develop their creativity and shape futures
                                                </p>
                                         </div>  
                                     </div>
                                </div>




                                <div className="uk-width-1-3@s">
                                     <div className=" uk-grid-small"  data-uk-grid>
                                         <div className="uk-width-1-4">
                                               <img src={badge3}  className="iconCC"   uk-scrollspy="cls: uk-animation-slide-left; repeat: true"/>
                                         </div>   

                                         <div className="uk-width-3-4">
                                            <h5 className="iconHeaderSmall" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                                                     Over 10 years Experience</h5>
                                               <p className="iconParagraphSmall" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                                                   A long history in maximizing students’ 
                                               potential and helping them develop their natural talents
                                                </p>
                                         </div>  
                                     </div>
                                </div>

                            </div>
                           
                        </div>
                  </div> 

                  {/**Course Options**/}
                   <div className="uk-container">
                       <div className="uk-width-1-1" >
                            <div className="uk-margin-large-top">
                               <h1 className="uk-text-center header1">   Experiences to <span className="greenText"> choose </span> from</h1>
                            </div>
                       </div>



                             <div className="uk-flex uk-flex-center uk-margin-large-top">
                                 <div className="mediumContainer ">
                                 <div className="uk-grid-medium" data-uk-grid>

                                  <div className="uk-width-1-3@s "  uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                        <div class="greenBg ">
                                                   
                                                   <div className="uk-flex uk-flex-center ">
                                                        <img src={bIcon}  className="icon uk-margin-small-top"/>
                                                   </div>
                                                 <div className="uk-text-center ">
                                                      <h4 className="iconHeaderBold light uk-text-center uk-margin-small-top">  Virtual Tech Camp</h4>
                                                        <p  className="iconParagraphSmall light">Tailored program adapted to Student's knowledge and pace. Fast and effective</p>
                                                 </div>
                                            </div>
                                  </div>

                                  <div className="uk-width-1-3@s"  uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                                  <div class="orangeBg" >
                                                   
                                                   <div className="uk-flex uk-flex-center ">
                                                        <img src={VSG}  className="icon uk-margin-small-top"/>
                                                   </div>
                                                 <div className="uk-text-center ">
                                                      <h4 className="iconHeaderBold light uk-text-center uk-margin-small-top">  Virtual Small Group</h4>
                                                        <p  className="iconParagraphSmall light">Fun tech courses to design game projects together with friends. Share and challenge</p>
                                                 </div>
                                            </div>
                                  </div>


                                    <div className="uk-width-1-3@s"  uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                    <div class="blueBg" >
                                                   
                                                   <div className="uk-flex uk-flex-center ">
                                                        <img src={schoolLocation}  className="icon uk-margin-small-top"/>
                                                   </div>
                                                 <div className="uk-text-center ">
                                                      <h4 className="iconHeaderBold light uk-text-center uk-margin-small-top">  At School Location</h4>
                                                        <p  className="iconParagraphSmall light">Choose a location near you to experience tech education on your own terms. Convenient and safe</p>
                                                 </div>
                                            </div>
                                    </div>

                                 </div>
                             
                            </div>

                            </div>

                   </div>


                                      
                                        {/** COUNTER  */}
                                        <div className="uk-margin-large-top">
                                            
                                            <div className="uk-flex uk-flex-center ">
                                            <div className="counterCCP ">
                                                <div class="" data-uk-grid>

                                                <div class="uk-width-1-3@s  ">
                                                        <div>
                                                           <div className="uk-flex uk-flex-center ">   
                                                               <img src ={modsPprojects}  className="iconBig  "/>
                                                            </div>
                                                            <p className="iconParagraphSmall uk-text-center uk-text-bold"> Mods or projects designed  </p>

                                                        </div>
                                                          
                                                </div>

                                                <div class="uk-width-1-3@s ">
                                                        <div>
                                                           <div className="uk-flex uk-flex-center ">   
                                                               <img src ={increase}  className="iconBig  "/>
                                                            </div>
                                                            <p className="iconParagraphSmall uk-text-center uk-text-bold"> Of teachers believe tech skills are a must </p>

                                                        </div>
                                                          
                                                </div>



                                                <div class="uk-width-1-3@s  ">
                                                        <div>
                                                           <div className="uk-flex uk-flex-center ">   
                                                               <img src ={increase2}  className="iconBig  "/>
                                                            </div>
                                                            <p className="iconParagraphSmall uk-text-center uk-text-bold"> Increase in academic results   </p>

                                                        </div>
                                                          
                                                </div>
                                      </div></div>
                                        </div>
                                        </div>







                                   



               </div>
            </section>










          {/****THIRD PANE */}
          <div className="uk-container uk-margin-large-top">
                 <div className="uk-width-1-1">
                    


                      <div className="uk-margin-xlarge-bottom">


                      <PageBlock>
                <Grid item xs={12} md={8} style={{ margin: 'auto' }}>
                    <PrimaryText>
                        Spring break & summer camps
                    </PrimaryText>
                </Grid>
                <Grid item xs={12}>
                </Grid>{
                    courseListStatus.status === 'FULFILLED' &&
                    courseListStatus.data &&
                    Object.values(Data.Config.Grade).map(grade =>
                        <>
                            <Grid xs={12} item disableGutter>
                                <SecondaryText className="greenText" style={{ fontSize: '28px' }}>
                                    Grade {grade.displayName}
                                </SecondaryText>
                            </Grid>
                            <Grid xs={12} item>
                                <Box container spacing={5} component={Grid} style={{ padding: '0px 7%' }}>
                                    {
                                        courseListStatus.data
                                            .filter(course => course.grade === grade.id)
                                            .slice(0, 6)
                                            .map(item =>
                                                <Grid item xs={12} sm={6} md={4}>
                                                    <CourseBlock
                                                        to={`/courses/${item.id}/${item.title.replaceAll(' ', '-')}`}
                                                        label={item.title}
                                                        grade={Data.Config.get(Data.Config.Grade, item.grade, 'displayName')}
                                                        courseType={Data.Config.get(Data.Config.CourseType, item.courseType, 'displayName')}
                                                        price={item.price}
                                                        mrpPrice={item.mrpPrice}
                                                        coverPic={item.coverImage && Api.Media.getThumb(item.coverImage)}
                                                    />
                                                </Grid>
                                            )
                                    }
                                </Box>
                            </Grid>
                        </>
                    )
                }
                <Grid xs={12} item>
                    <Link to="/courses" component={PrimaryButton}>View All Courses & Plan</Link>
                </Grid>
            </PageBlock>
     
                  </div>


                 </div>
            </div>

            <div className="uk-margin-xlarge-top ">
            <TestimonialBlock />
            </div>


            <section className="teachersBg uk-margin-xlarge-top ">
                         <CertifiedTeacherBlock />
            </section>


            <div className="uk-container uk-padding-large">
                  <div className="" data-uk-grid>
                      <div className="uk-width-1-2@s">
                          <div className=" uk-padding" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                              <img src= {cs_video2} />
                          </div>
                      </div>

                      <div className="uk-width-1-2@s">
                          <div className="uk-margin-large-top ">
                              <h3 className="header1" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Sign up  for a Free <span className="greenText" >Discovery Lesson</span></h3>
                              <p className="subText" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Experience a 30 Minutes Computer Course with a Live Teacher. Choose
                                   your favorite course and get to see if we are the right fit for you. No strings attached.</p>

                                   <div class="uk-flex withPaddingSmall ">
                         
                        <Link to='/contactus'> <div class=" btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Schedule Now</div></Link>
                        
                      </div>
                         </div>
                      </div>
                </div>
            </div>


            <div className="uk-container uk-padding">
                  <div className="" data-uk-grid>
                     

                      <div className="uk-width-1-2@s">
                          <div className=" ">
                              <h1 className="header1" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">You can also go for Computer courses at  <span className="greenText"> Parks & Rec Center & School Locations </span></h1>
                            

                              <div class="uk-flex uk-margin-top" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                                <div className="iconCheck"><img src={check} /></div>
                                  <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                   
                                   <p className="iconParagraph">We partnered up with Schools to bring in-demand computer courses to develop tech skills for students K-8</p>
                                   </div>
                                </div>

                           </div>


                           <div class="uk-flex " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                                <div className="iconCheck"><img src={check} /></div>
                                  <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                   
                                   <p className="iconParagraph">You can choose Schools and Parks & Rec Centers that fit your schedule and mobility</p>
                                   </div>
                                </div>

                           </div>



                           <div class="uk-flex " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                                <div className="iconCheck"><img src={check} /></div>
                                  <div class="uk-margin-left">
                                   <div className="iconTextContainer">
                                   
                                   <p className="iconParagraph">Find a location that suits you best and register your child for as many hours as you need</p>
                                   </div>
                                </div>

                           </div>





                            <div class="uk-flex withPaddingSmall ">
                             <Link to='/contactus'> <div class=" btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Schedule Now</div></Link>
                           </div>

                         </div>
                      </div>




                      <div className="uk-width-1-2@s">
                          <div className=" uk-padding" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                              <img src= {onlineClassroom} />
                          </div>
                      </div>


                </div>
            </div>






























        </Layout>



    );
}