import React, { useEffect, useState } from "react";
import {
    Box, TableCell, TableHead, Typography, IconButton, TableRow,
    Table, TableBody, Paper, TableContainer, Collapse
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { PrimaryButtonOutlined, SecondaryText } from "../Atoms";
import { Link } from "react-router-dom"
import { fetchDetailsList } from "./../../DataStore/CourseReducer"
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import Data from "../../Data";
import { useUserInfo } from "../Authentication/Authorize";


function createData(id, title, grade, skillLevel, courseType, price, startTime) {
    return {
        id,
        title,
        courseType,
        grade,
        skillLevel,
        price,
        startTime,
        history: [
            { name: 'Sourav Paul', email: 'xyz@gmail.com', amount: 3 },
            { name: 'Sujoy Saha', email: 'anc@gmail.com', amount: 1 },
        ],
    };
}

const rows = [
    createData(1, 'Python Course', '1-4', 'Beginner', 'ONE ON ONE', 10.77, '25th Feb, 2021 10:30'),
    createData(1, 'Python Course', '1-4', 'Beginner', 'ONE ON ONE', 10.77, '27th Feb, 2021 10:30'),
    createData(1, 'Python Course', '1-4', 'Beginner', 'ONE ON ONE', 10.77, '28th Feb, 2021 10:30'),
    createData(1, 'Minecraft Course', '4-8', 'Expert', 'ONE ON ONE', 15.77, '29th Feb, 2021 10:30'),
    createData(1, 'Minecraft Course', '4-8', 'Expert', 'ONE ON ONE', 16.77, '30th Mar, 2021 10:30'),
    createData(1, 'Minecraft Course', '4-8', 'Expert', 'ONE ON ONE', 17.77, '30th April, 2021 10:30'),
];


export default function CourseTableGrid(props) {
    const courseListStatus = useSelector(state => state.course.fetchDetailsList)
    const dispatch = useDispatch();
    const userInfo = useUserInfo();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (!mounted && userInfo) {
            dispatch(fetchDetailsList(userInfo));
            setMounted(true)
        }
    }, [userInfo])

    const getFormatterCourseList = (courseList) => {
        const formated_course = []
        courseList.map(course => {
            (course.schedules && course.schedules.length > 0)
                ? course.schedules.map(courseSchedule => {
                    formated_course.push({
                        ...courseSchedule,
                        id: course.id,
                        title: course.title,
                        price: course.price,
                        mrpPrice: course.mrpPrice,
                        courseType: course.courseType,
                    });
                })
                : formated_course.push({
                    id: course.id,
                    title: course.title,
                    price: course.price,
                    mrpPrice: course.mrpPrice,
                    courseType: course.courseType,
                });
        });
        return formated_course.sort((a, b) => {
            if (a.startTime && b.startTime)
                return a.startTime > b.startTime ? 1 : -1;
            else if (!a.startTime) return 1;
            else return -1;
        });
    }


    return (
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Course Name</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell align="right">Course Type</TableCell>
                            <TableCell align="right">Capacity</TableCell>
                            <TableCell align="right">Participant</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            courseListStatus.status === 'FULFILLED' &&
                            courseListStatus.data &&
                            getFormatterCourseList(courseListStatus.data)
                                .map(
                                    course => <CourseRow courseInfo={course} />
                                )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

}



function CourseRow(props) {
    const { courseInfo } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {courseInfo.title}
                </TableCell>
                <TableCell>
                    {
                        courseInfo.startTime
                            ? <Moment format="MMM DD, YYYY  hh:mm A">
                                {courseInfo.startTime}
                            </Moment>
                            : 'NA'
                    }
                </TableCell>
                <TableCell align="right">
                    {courseInfo && Data.Config.get(Data.Config.CourseType, courseInfo.courseType, 'displayName')}

                </TableCell>
                <TableCell align="right">
                    {courseInfo.startTime ? courseInfo.capacity : 'NA'}
                    {/* {props.courseInfo && Data.Config.get(Data.Config.Grade, courseInfo.grade, 'displayName')} */}
                </TableCell>
                <TableCell align="right">
                    {courseInfo.startTime ? courseInfo.participant : 'NA'}
                    {/* {props.courseInfo && Data.Config.get(Data.Config.SkillLevel, courseInfo.skillLevel, 'displayName')} */}
                </TableCell>
                <TableCell align="right">${courseInfo.price} (${courseInfo.mrpPrice})</TableCell>
                <TableCell align="right">
                    <Link component={PrimaryButtonOutlined}
                        to={`/courses/${courseInfo.id}/${courseInfo.title.replaceAll(' ', '-')}`}> View</Link>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Participents
                            </Typography>
                            {
                                courseInfo.participants && courseInfo.participants.length > 0
                                    ? <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Parent Email</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {courseInfo.participants.map((participant) => (
                                                <TableRow key={participant.name} hover>
                                                    <TableCell component="th" scope="row">
                                                        {`${participant.firstName} ${participant.lastName}`}
                                                    </TableCell>
                                                    <TableCell>{participant.parentEmail}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    : <SecondaryText style={{ color: 'gray' }}>No Participants</SecondaryText>
                            }

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}