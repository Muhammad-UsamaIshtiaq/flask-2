import {
    BodyText, PageBlock, PrimaryText, TickLabels,
    HeaderBox, HeaderTitle, PrimaryButton, HeaderDescription, SecondaryText, CourseBlock
} from "../../features/Atoms";
import Layout from "../Layout";
import "./techCamp.css"
import { Grid, Box, Paper, CardMedia, Card, CardContent, Divider, Hidden, Typography } from "@material-ui/core";

import computer_courses_icon from "./../../images/computer-courses-icon.png"
import tech_camps_icon from "./../../images/tech-camps-icon.png"
import courses_at_school_location_icon from "./../../images/courses-at-school-location-icon.png"
import indexImg from "./../../images/Indexbackground.jpg";
import CertifiedTeacherBlock from "./Block/CertifiedTeacherBlock";

import First_Pane from "./Block/First_pane";
import Second_Pane from "./Block/Second_Pane";
import Fourth_Pane from "./Block/Fourth_Pane";
import Fifth_Pane from "./Block/Fifth_Pane";
import Sixth_Pane from "./Block/Sixth_Pane";
import Seventh_Pane from "./Block/Seventh_Pane"




import indexBg from "./../../images/indexBg.jpg"
import whychooseicon5 from "./../../images/whychooseicon5.png"
import Teachers_page from "./../../images/Teachers_page.jpg"
import teacher_lap from "./../../images/ty-860x573.jpg"
import Teachers_page2 from "./../../images/Teachers_page2.jpg"
import blog3 from "./../../images/blog3-585x390.png"
import best_selection from "./../../images/best_selection.png"
import indepth_ass from "./../../images/indepth_ass.png"
import interviews from "./../../images/interviews.png"
import staff from "./../../images/staff.PNG"
import logos from "./../../images/logos.PNG"
import logoBack from "./../../images/logo-back.PNG"
import { Link } from "react-router-dom";
import { CourseTypeButton } from "../HomePage/Blocks/CourseTypesBlock";
import EliteTeachersBlock from "./Block/Teachers"
import TestimonialBlock from "../HomePage/Blocks/TestimonialBlock";
import onlineClassroom from "./../../images/online-classroom-47-2-540x482.png"
import tech_landing_bg from "./../../images/tech_landing_bg-860x486.jpg"
import student_bg from "./../../images/student_bg-380x335.jpg"
import techcamp_pic from "./../../images/techcamp_pic.png"
import tech_laptop_graph_pic from "./../../images/laptop-graph-left3-small-380x380.png"


import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAllCourse } from "../../DataStore/CourseReducer";
import Data from "../../Data";
import Api from "../../Api";
import { useAuthorize } from "../../features/Authentication/Authorize";




export default function TechCampCoursePage(props) {

    const isTeacher = useAuthorize('TEACHER');
    const isStudent = useAuthorize('STUDENT');
    const courseListStatus = useSelector(state => state.course.loadAllCourse)
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (!mounted) {
            dispatch(loadAllCourse({
                courseCategory: [Data.Config.CourseCategory.TECH_CAMP.id]
            }));
            setMounted(true)
        }
    }, [])

    const registerHandle = () => {
        document.getElementById("authButton")?.click()
    }

    return (
        <Layout>
                 <section className="techCampHeader">
                  <div className="uk-container uk-padding">
                <div className="uk-grid " data-uk-grid>
                <div className="uk-width-2-3@s  ">
                      <div className="uk-margin-xlarge-top " >
                          <h1 className="header1 light withPadding uk-padding" uk-scrollspy="cls: uk-animation-slide-left; repeat: true"> Experience fun and learn with CyberTeck Academy Camps </h1>
                          <p className="subTitleText " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Put that school-free time to good use and get your child excited about tech. Technology-focused courses to make your child part of a smart group of friends.
  </p>
                      </div>

                      <div class="uk-flex uk-margin-large-top ">
                         
                             <div>
                                
                {
                    !isStudent && !isTeacher &&
                    <Link rounded component={PrimaryButton}
                        onClick={registerHandle}>Register</Link>
                }
                
                             </div>
                        
                      </div>
  
                 </div>

                    <div className="uk-width-1-3@s">
                        
                    </div>
                </div>
            </div>
            </section>

             <First_Pane /> 
             <Second_Pane />
             <Fourth_Pane />
             <TestimonialBlock />
             <EliteTeachersBlock />
             <Fifth_Pane />
             <Sixth_Pane />
             <Seventh_Pane />
           



        </Layout>
    );
}
