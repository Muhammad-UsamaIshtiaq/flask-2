import Layout from "../Layout";
import "./homepage.css"
import "./query.css"
import {
    HeaderTitle, HeaderDescription, PrimaryButton, HeaderBox
} from "./../../features/Atoms"
import {
} from "@material-ui/core";
import CourseTypesBlock from "./Blocks/CourseTypesBlock"
import WhyChooseBlock from "./Blocks/WhyChooseBlock"
import TestimonialBlock from "./Blocks/TestimonialBlock"
import LatestCourseBlock from "./Blocks/LatestCourseBlock"
import TheProcessBlock from "./Blocks/TheProcessBlock"
import TechWideWorldBlock from "./Blocks/TechWideWorldBlock"
import VirtualTutoringBlock from "./Blocks/VirtualTutoringBlock"
import AmazingTeachersBlock from "./Blocks/AmazingTeachersBlock"
import BannerBlockBlock from "./Blocks/BannerBlockBlock"
import BlogNewsBlock from "./Blocks/BlogNewsBlock"
import StatisticsBlock from "./Blocks/StatisticsBlock"
import indexImg from "./../../images/Indexbackground.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import ContactModal from './../../features/ContactModal';
export default function HomePage(props) {
    const [ contactModalStatus, setContactModalStatus ] = useState(false);

    return (
        <Layout>
           <section className="headerBg">
            <div className="uk-container uk-padding">
                <div className="uk-grid " data-uk-grid>
                <div className="uk-width-3-4@s  ">
                      <div className="uk-margin-xlarge-top " >
                          <h1 className="header1 light withPadding uk-padding" uk-scrollspy="cls: uk-animation-slide-left; repeat: true"> The future is bright and filled with Tech We get your child ready for it </h1>
                          <p className="subTitleText " uk-scrollspy="cls: uk-animation-slide-left; repeat: true"> Knowing what to learn and how to do it better and faster is essential.
                    Our expert educators lead the way and empower your children for
                    what comes next. Tutoring to boost education, Tech Courses to bring
                    innovation.</p>
                      </div>

                      <div class="uk-flex uk-margin-large-top ">
                         
                        
                <Link onClick={()=>setContactModalStatus(true)} component={PrimaryButton} className="marginGapBottom ">
                    Free 30min Computer Lesson</Link> &nbsp;&nbsp;
                {/* <PrimaryButtonOutlined className="marginGapBottom">Free 1hr Math Taining</PrimaryButtonOutlined> */}
                
                        
                      </div>
  
                 </div>

                    <div className="uk-width-1-4@s">
                        
                    </div>
                </div>
            </div>
            </section>
           

            <ContactModal open={contactModalStatus} handleClose={()=>setContactModalStatus(false)}/> 
            
 <CourseTypesBlock />
            
            <WhyChooseBlock />
            <TestimonialBlock />
            <LatestCourseBlock />
            <TheProcessBlock />
            <TechWideWorldBlock />
            
            <AmazingTeachersBlock />
            <BannerBlockBlock />
             <BlogNewsBlock />
           
           
        </Layout>
    );
}



