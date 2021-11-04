import Layout from "../Layout";
import "./schoolListingPage.css"
import {
    BodyText,
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryButton, PrimaryText, SecondaryText
} from "./../../features/Atoms"
import { Box, Grid, Link, Paper, Typography } from "@material-ui/core";
import coverImg from "./../../images/minecraft-animation.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loadSchool } from "./../../DataStore/SchoolReducer"
import { useEffect, useState } from "react";
import Data from "../../Data";
import Api from "../../Api";
import tick_icon from "./../../images/tick_icon.png"
import coverPic from "./../../images/staff.PNG"
// import SchoolTableGrid from "../../features/SchoolTableGrid";
import SchoolListingGrid from './../../features/SchoolListingGrid';
import SchoolListTabs from './blocks/schoolListSection';
import useFetch from "react-fetch-hook";
import './schoolLisintPage.css';

export default function SchoolListingPage(props) {

    return (
        <Layout className="detailsBlock">
            <HeaderBox style={{ paddingTop: '35%', }}
                coverPic={coverPic}>
                <HeaderTitle>
                    Our Customers
                </HeaderTitle>
            </HeaderBox>

            <PageBlock>
                {/* <Grid item xs={12}>
                    <SchoolListingGrid />
                </Grid> */}
                <TabularSchoolList />
            </PageBlock>

        </Layout>
    );
}

export const TabularSchoolList = props => {
    const { isLoading, error, data } = useFetch(Api.School.loadAllSchoolUrl());
    const tabChunkList = [];
    if (!isLoading) {
        const alphabateGrids = {};
        const alphabetGroupList = [];
        const classHeight = 6;
        let schoolNames = Data.SchoolNames;
        let unique = [];

        const ids = new Set(data.data.map(d => d.name.toUpperCase()));
        unique = [...data.data, ...schoolNames?.filter(d => !ids.has(d?.name))];
        schoolNames = unique;

        const compare = (a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }
        schoolNames.sort(compare);
        if (schoolNames) {
            for (let i = 0; i < schoolNames.length; i++) {
                const key = schoolNames[i]?.name[0].toUpperCase();
                if (alphabateGrids[key]) {
                    alphabateGrids[key].push(schoolNames[i]);
                } else {
                    alphabateGrids[key] = [];
                    alphabateGrids[key].push(schoolNames[i]);
                }
            }
        }
        const keys = Object.keys(alphabateGrids);

        for (let i = 0; i < keys.length; i += classHeight) {
            const classGroup = keys.slice(i, (i + classHeight))
            let lowerLimit, upperLimit;
            let obj = {};

            for (let j = 0; j < classGroup.length; j++) {
                lowerLimit = classGroup[0].toUpperCase();
                upperLimit = classGroup[classGroup.length - 1].toUpperCase();
                if (obj[(lowerLimit + '-' + upperLimit)]) {
                    obj[(lowerLimit + '-' + upperLimit)].push([...alphabateGrids[classGroup[j]]])
                } else {
                    obj[(lowerLimit + '-' + upperLimit)] = []
                    obj[(lowerLimit + '-' + upperLimit)].push([...alphabateGrids[classGroup[j]]])
                }
            }
            alphabetGroupList.push(obj);
        }
        const chunkHeight = 6;
        for (let i = 0; i < alphabetGroupList.length; i += chunkHeight) {
            tabChunkList.push(
                [alphabetGroupList.slice(i, (chunkHeight + i))]
            )
        }
    }
    return (
        <Grid item xs={12}>
            {
                isLoading ? <h1>Loading ... </h1> :
                    tabChunkList?.map((schoolListData, index) => <SchoolListTabs schoolListingData={schoolListData} showDefault={index} />)
            }
        </Grid>
    )
}
