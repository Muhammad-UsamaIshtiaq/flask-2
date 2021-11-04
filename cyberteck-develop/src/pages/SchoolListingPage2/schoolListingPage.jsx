import Layout from "../Layout";
import {
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryButton, PrimaryText, SecondaryText
} from "./../../features/Atoms"
import { Box, Grid, Link, Paper, Typography, Hidden, Container } from "@material-ui/core";
import coverImg from "./../../images/schools_bg.jpg";
import { useEffect, useState } from "react";
import IntroductionSection from './blocks/introduction';
import SchoolDescription from "./blocks/schoolDescription";
import ProgramInfo from "./blocks/programInfo";
import Testimonial from './blocks/testtimonial';
import FactsSection from "./blocks/factsSection";
import CoursesSection from "./blocks/courses";
import First_pane from "./blocks/first_pane";
import SearchSchools from './blocks/search_school';
import CoursesPark from './blocks/courses_prk_rec';
import ContactModal from './../../features/ContactModal';
import { TabularSchoolList } from './../SchoolListingPage/schoolListingPage';


export default () => {
    
    
    return (
        <Layout>
            <First_pane />
            <IntroductionSection />
            <SchoolDescription />
            {/*   <CoursesSection >  */}
            <ProgramInfo />
            <SearchSchools className="CourseSearchArea"/>
            <Container style={{ marginTop: 30 }}>
                <Grid container direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={8} style={{margin: '20px 0', marginTop: '10vh'}}>
                        <PrimaryText style={{textAlign: 'center'}}>Our Customer List</PrimaryText>
                    </Grid>
                </Grid>
                <TabularSchoolList />
            </Container>
            <PageBlock>
                <Box id="map"></Box>
            </PageBlock>
            <Testimonial />
            
            <FactsSection />
            <CoursesPark />

          
            
        

           
           
        </Layout>
    )
}