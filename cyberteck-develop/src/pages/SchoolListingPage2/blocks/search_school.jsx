import staff from './../../../images/staff.PNG';
import Data from './../../../Data';
import Api from './../../../Api';

import { FormControl, InputLabel, Select, MenuItem, Box, Grid, Paper, Typography, Hidden, Container, Divider, TextField } from "@material-ui/core";
import {
    BodyText,
    AutoCompleteInputBox,
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryButton, PrimaryText, SecondaryText
} from "./../../../features/Atoms"
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    const [schoolSearchData, setSchoolSearchData] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [gradeFilter, setGradeFilter] = useState('');
    const [courseFilter, setCourseFilter] = useState('');
    const [schoolFilter, setSchoolFilter] = useState('');

    const gradeOptions = [];
    const gradeKeys = Object.keys(Data.Config.Grade);
    for (let i = 0; i < gradeKeys.length; i++) {
        gradeOptions.push(Data.Config.Grade[gradeKeys[i]]);
    }
    const updateFilters = (event) => {
        switch (event.target.name) {
            case 'courseFilter':
                setCourseFilter(event.target.value);
                break;
            case 'schoolName':
                setSchoolFilter(event.target.value);
                break;
            case 'grade':
                setGradeFilter(event.target.value);
                break;
        }
    }

    const coursesListOrganizer = data => {
        console.log(data);
        setIsloading(false);
        let schoolCourseList = data?.data;
        let courseList = [];
        console.log("SCHOOL: ", schoolCourseList)
        for (const school of schoolCourseList) {
            for (const courses of school.courses) {
                courseList.push({ ...courses, schoolName: school.name, schoolId: school.id })
            }
        }
        setSchoolSearchData(courseList)
    }

    const updateSearch = (pageSize=0) => {
        setIsloading(true);
        fetch(Api.School.searchSchoolCourses({ gradeFilter, courseFilter, schoolFilter }, pageSize))
            .then(response => response.json())
            .then(data => { console.log(data); coursesListOrganizer(data) })
    }
    useEffect(() => {
        updateSearch(3)
    }, [])
    return (
        <Grid container style={{ marginTop: 30 }} className={props?.className}>
            <Grid item xs={12}>
                <Container maxWidth="xl">
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container direction="row" justifyContent="center" alignItems="center">
                                <Grid xs={12}>
                                    <h1 className="header1 uk-margin-large-top uk-text-center">Find your preferred<br />
                                    <span className="greenText" >Location</span></h1>
                                    <p className="uk-text-center withPaddingToCenterSubText">Choose one of our partener locations at Schools and Parks & Rec Centers at your
                                         convenience. Go for Virtual or In-person Tech Camp options.</p>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Grid container direction="row" alignItems="center" justifyContent="center">
                                <Grid item xs={12} sm={8}>
                                    <Paper style={{ padding: '5% 5%' }}>
                                        <Grid container direction="row" alignItems="center" justifyContent="center">
                                            <Grid item md={3} xs={12} style={{ padding: 10 }}>
                                                <InputFeild handleChange={updateFilters} label="schoolName" placeholder="School..." />
                                            </Grid>
                                            <Grid item md={3} xs={12} style={{ padding: 10 }}>
                                                <InputFeild label="courseFilter" placeholder="Course..." handleChange={updateFilters} />
                                            </Grid>
                                            <Grid  item md={3} xs={12} style={{ padding: 10 }}>
                                                <SelectFeild  label="grade" memuItems={gradeOptions} value={gradeFilter} handleChange={updateFilters} />
                                            </Grid>
                                            <Grid item md={3} style={{ textAlign: 'center' }}>
                                                <PrimaryButton onClick={()=>updateSearch()}>Search</PrimaryButton>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid xs={12} sm={8} style={{marginTop: 0, marginBottom: 0}}>
                                    <SecondaryText style={{textAlign: 'center', marginTop: 20}}>List of Schools and Park and Rec Centers in person courses we are offering. </SecondaryText>
                                </Grid>
                                <Grid item sm={8} xs={12} style={{ marginTop: 30 }}>
                                    <Paper style={{ padding: '5% 5%' }}>
                                        <Grid container direction="row" alignItems="center" justifyContent="center">
                                            <SearchResults schoolName="School" courseName="Course" grade="Grade" header />
                                            {
                                                isLoading ? <h1> Loading </h1> : schoolSearchData?.map(course => <SearchResults schoolId={course.schoolId} schoolName={course.schoolName} isActive={course.isActive} courseName={course.title} grade={course.grade} />)
                                            }
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}

const SearchResults = props => {
    console.log("SEARCH RES: ", props.isActive);
    if (props.isActive)
    return (
        <Grid item xs={12}>
            <Grid container style={{ padding: 10 }} >
                <Grid item xs={3} style={{ background: props?.header ? '#106a75' : 'none', padding: 10 }}>
                    <SecondaryText className="searchSchool" style={{ textAlign: 'center', color: props?.header ? 'white' : 'black' }}>{props?.schoolName}</SecondaryText>
                </Grid>
                <Grid item xs={3} style={{ background: props?.header ? '#106a75' : 'none', padding: 10 }}>
                    <SecondaryText className="searchSchool" style={{ textAlign: 'center', color: props?.header ? 'white' : 'black' }}>{props?.courseName}</SecondaryText>
                </Grid>
                <Grid item xs={3} style={{ background: props?.header ? '#106a75' : 'none', padding: 10 }}>
                    <SecondaryText className="searchSchool" style={{ textAlign: 'center', color: props?.header ? 'white' : 'black' }}>{props?.grade}</SecondaryText>
                </Grid>
                <Grid item xs={3} style={{ background: props?.header ? '#106a75' : 'none', padding: 10 }}>
                    {
                        props?.header ? null : <Link className="defaultLink" to={`/schools/${props.schoolId}/${props.schoolName.replaceAll(' ', '-')}`}><PrimaryButton style={{ textAlign: 'center', padding: 5, margin: 0, width: '100%'}} className="schoolSearchButton">View Schedule/Register</PrimaryButton></Link>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
    return <></>
}


const InputFeild = (props) => {
    const placeholder = props?.placeholder ?? "Input ...";
    return (
        <TextField label={placeholder} onChange={props?.handleChange} variant="filled" inputProps={{
            name: props?.label,
        }} style={{
            border: '1px solid #73d56e',
            borderRadius: 5,
            fontSize: 20,
            width: '100%',
        }} />
    )
}

const SelectFeild = props => {
    return <FormControl style={{
        width: '100%', borderRadius: 5,
        fontSize: 20,
    }}>
        <InputLabel id="demo-simple-select-label" style={{ padding: '0 2px' }}>{props.label}</InputLabel>
        <Select
            variant="filled"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props?.value}
            onChange={props?.handleChange}
            inputProps={{
                name: props?.label,
            }}
        >
            <MenuItem value={''}>ALL</MenuItem>
            {
                props?.memuItems?.map(item => <MenuItem value={item.id}>{item.displayName}</MenuItem>)
            }
        </Select>
    </FormControl>
}