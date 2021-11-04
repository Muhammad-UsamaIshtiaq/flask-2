import {
    BodyText, PageBlock, PrimaryText, TickLabels,
    HeaderBox, HeaderTitle, PrimaryButton, HeaderDescription, SecondaryText
} from "../../features/Atoms";
import Layout from "../Layout";
import { Grid, Box, Paper, CardMedia, Card, CardContent, Divider, Hidden } from "@material-ui/core";

import indexImg from "./../../images/Indexbackground.jpg";
import indexBg from "./../../images/indexBg.jpg"
import whychooseicon5 from "./../../images/whychooseicon5.png"

import teacher_lap from "./../../images/ty-860x573.jpg"
import Teachers_page2 from "./../../images/Teachers_page2.jpg"
import blog3 from "./../../images/blog3-585x390.png"
import best_selection from "./../../images/best_selection.png"
import indepth_ass from "./../../images/indepth_ass.png"
import interviews from "./../../images/interviews.png"
import staff from "./../../images/staff.PNG"

import logoBack from "./../../images/logo-back.PNG"
import { Link } from "react-router-dom";
import teacher_pic1 from "./../../images/teacher_pic1.png"
import teacher_pic2 from "./../../images/teacher_pic2.jpg"
import teacher_pic3 from "./../../images/teacher_pic3.jpg"


import First_Pane  from "./Block/First_Pane";
import Second_Pane  from "./Block/Second_Pane";

import Third_Pane  from "./Block/Third_Pane";
import AmazingTeachers from "./../HomePage/Blocks/AmazingTeachersBlock"


const  TeacherPage = () => {

    return (
        <Layout>
                <First_Pane />
                <div className="uk-margin-xlarge-top">
                 <div className="-vMarginMobile"><AmazingTeachers /></div>
                <Second_Pane />
                <Third_Pane />
                </div>
             </Layout>
);


    }


    export default TeacherPage ;