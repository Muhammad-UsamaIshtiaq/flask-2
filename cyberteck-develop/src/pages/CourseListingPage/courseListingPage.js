import Layout from "../Layout";
import "./courseListingPage.css"
import {
    CourseBlock,
    HeaderBox, HeaderDescription, HeaderTitle, PageBlock, PrimaryText, SecondaryText
} from "./../../features/Atoms"
import { Grid, Box, Checkbox, FormControlLabel, Slider, Hidden, CircularProgress } from "@material-ui/core";
import coverImg from "./../../images/course_header.jpg";
import { useDispatch, useSelector } from 'react-redux'
import { loadAllCourse } from "./../../DataStore/CourseReducer"
import { useEffect, useState } from "react";
import Data from "../../Data";
import course1 from "./../../images/course1.JPG"
import Api from "../../Api";

export default function CourseListingPage(props) {
    const [filterQuery, setFilterQuery] = useState({});
    const courseListStatus = useSelector(state => state.course.loadAllCourse && state.course.loadAllCourse)
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (!mounted) {
            dispatch(loadAllCourse());
            setMounted(true)
        }
    }, [])

    const handleFilterChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const newFilterQuery = { ...filterQuery }

        const queryFieldValues = filterQuery[fieldName] || []
        const newQueryFieldValues = e.target.checked
            ? [...queryFieldValues, fieldValue]
            : queryFieldValues.filter(item => item !== fieldValue);
        newFilterQuery[fieldName] = newQueryFieldValues;
        setFilterQuery({
            ...newFilterQuery
        })
        dispatch(loadAllCourse(newFilterQuery));
    }

    return (
        <Layout className="detailsBlock">
            {

                <HeaderBox style={{ paddingTop: '35%' }} fullWidth coverPic={coverImg}>
                    <HeaderTitle style={{ textAlign: 'center' }}>
                        The hottest on-campus and virtual tech courses
                    </HeaderTitle>
                    <Hidden mdDown>
                        <HeaderDescription style={{ textAlign: 'center' }}>
                            Flex Your creativity, collaborate with your peers and build the skills shought after by
                            tech icons like Google, EA and Tesla. All skill level welcome!
                        </HeaderDescription>
                    </Hidden>
                </HeaderBox>
            }
            <PageBlock direction="row-reverse" style={{ marginBottom: '15%' }}>
                <Grid item sm={3} xs={12} >
                    <PrimaryText style={{ textAlign: 'left', fontSize: '30px' }}>Filter Courses</PrimaryText>
                    <Box style={{ textAlign: 'left', marginBottom: '5px', marginTop: '30px' }}>
                        <SecondaryText>PRICE</SecondaryText>
                        <Slider
                            max={500}
                            name="priceRange"
                            onChange={(e, value) => {
                                dispatch(loadAllCourse({
                                    ...filterQuery,
                                    priceRange: value
                                }));
                                setFilterQuery({
                                    ...filterQuery,
                                    priceRange: value
                                })

                            }}
                            defaultValue={[0, 1000]}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            marks={[
                                {
                                    value: 0, label: '$0',
                                },
                                {
                                    value: 500, label: '$500'
                                }
                            ]}
                        />

                    </Box>
                    <Box style={{ textAlign: 'left', marginBottom: '5px', marginTop: '30px' }}>
                        <SecondaryText>Course Type</SecondaryText>
                        {
                            Object.values(Data.Config.CourseType).map(item =>
                                <FormControlLabel
                                    style={{ display: 'block' }}
                                    value={item.id}
                                    onChange={handleFilterChange}
                                    control={<Checkbox name="courseType" />}
                                    label={item.displayName}
                                />
                            )
                        }
                    </Box>
                    <Box style={{ textAlign: 'left', marginBottom: '5px', marginTop: '30px' }}>
                        <SecondaryText>Course Category</SecondaryText>
                        {
                            Object.values(Data.Config.CourseCategory).map(item =>
                                <FormControlLabel
                                    style={{ display: 'block' }}
                                    value={item.id}
                                    onChange={handleFilterChange}
                                    control={<Checkbox name="courseCategory" />}
                                    label={item.displayName}
                                />
                            )
                        }
                    </Box>
                    <Box style={{ textAlign: 'left', marginBottom: '5px', marginTop: '30px' }}>
                        <SecondaryText>Grade</SecondaryText>
                        {
                            Object.values(Data.Config.Grade).map(item =>
                                <FormControlLabel
                                    style={{ display: 'block' }}
                                    value={item.id}
                                    onChange={handleFilterChange}
                                    control={<Checkbox name="grade" />}
                                    label={item.displayName}
                                />
                            )
                        }
                    </Box>
                    <Box style={{ textAlign: 'left', marginBottom: '5px', marginTop: '30px' }}>
                        <SecondaryText>SKILL LEVEL</SecondaryText>
                        {
                            Object.values(Data.Config.SkillLevel).map(item =>
                                <FormControlLabel
                                    style={{ display: 'block' }}
                                    value={item.id}
                                    onChange={handleFilterChange}
                                    control={<Checkbox name="skillLevel" />}
                                    label={item.displayName}
                                />
                            )
                        }
                    </Box>
                </Grid>
                <Grid item sm={9} xs={12}>
                    {
                        courseListStatus.status === 'PENDING' &&
                        <CircularProgress />
                    }
                    {
                        courseListStatus.status !== 'PENDING' &&
                        (!courseListStatus.data || courseListStatus.data.length === 0) &&
                        <PrimaryText style={{ textAlign: 'left', fontSize: '25px' }}>
                            No Record Found</PrimaryText>
                    }
                    {
                        courseListStatus.status === 'FULFILLED' &&
                        courseListStatus.data && courseListStatus.data.length > 0
                        && <Box container spacing={5} component={Grid}>
                            {
                                courseListStatus.data.map(item =>
                                    <Grid item xs={12} sm={6} md={4}>
                                    
                                        <CourseBlock
                                            to={`/courses/${item.id}/${item.title.replaceAll(' ', '-')}`}
                                            label={item.title}
                                            grade={Data.Config.get(Data.Config.Grade, item.grade, 'displayName')}
                                            courseType={Data.Config.get(Data.Config.CourseType, item.courseType, 'displayName')}
                                            price={item.price}
                                            mrpPrice={item.mrpPrice}
                                            coverPic={item.coverImage ? Api.Media.getThumb(item.coverImage) : course1}
                                        />
                                    </Grid>
                                )

                            }
                        </Box>
                    }
                    <Box container spacing={5} component={Grid}>

                    </Box>
                </Grid>
            </PageBlock>
        </Layout>
    );
}



