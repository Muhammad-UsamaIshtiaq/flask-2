import Layout from "../Layout";
import React from "react";
import FirstPane from "./Blocks/FirstPane";
import SecondPane from "./Blocks/SecondPane";
import ThirdPane from './Blocks/ThirdPane';
import FifthtPane from "./Blocks/FifthPane";
import SixthPane from "./Blocks/SixthPane";
import SeventhPane from "./Blocks/SeventhPane";
import EightPane from "./Blocks/EightPane";
import NinethPane from "./Blocks/NinethPane";
import './aboutUs.css';
import './query.css';


import { Link } from "react-router-dom/cjs/react-router-dom.min";




export default function AboutUsPage() {

    return (
        <Layout>
        < FirstPane />
        <SecondPane />
        <ThirdPane />
        <FifthtPane />
        <SixthPane />
        <SeventhPane />
        <EightPane />
        <NinethPane />
        
        
        </Layout>
    );
}
