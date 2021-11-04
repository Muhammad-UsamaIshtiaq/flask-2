import {
    PrimaryButtonOutlined, SecondaryText
} from "./../../../features/Atoms"

import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import {
    Dialog, DialogContent, DialogContentText, Button, DialogTitle,
    DialogActions, Box, IconButton, Grid, Paper
} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux'

import { loadCourseSchedule, createCourseSchedule, clearCreateState, removeCourseSchedule } from "./../../../DataStore/CourseScheduleReducer";
import { useEffect, useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Moment from "react-moment"
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'

export default function CourseScheduleBlock(props) {
    const [openAddSchedule, setOpenAddSchedule] = useState(false);
    const [openViewSchedule, setOpenViewSchedule] = useState(false);

    return (
        <Box>
            <PrimaryButtonOutlined rounded onClick={() => setOpenAddSchedule(true)}>Add Schedule</PrimaryButtonOutlined>
            <PrimaryButtonOutlined rounded onClick={() => setOpenViewSchedule(true)}>View Schedule</PrimaryButtonOutlined>
            <ViewScheduleDialog courseId={props.courseId}
                open={openViewSchedule}
                onAddNew={() => {
                    setOpenViewSchedule(false);
                    setOpenAddSchedule(true);
                }}
                onClose={() => setOpenViewSchedule(false)} />
            <AddScheduleDialog courseId={props.courseId}
                open={openAddSchedule}
                onClose={() => setOpenAddSchedule(false)} />
        </Box>
    );
}

const ViewScheduleDialog = (props) => {
    const [loaded, setLoaded] = useState(true);
    const courseScheduleStatus = useSelector(state => state.courseSchedule.loadCourseSchedule);
    const removeCourseScheduleStatus = useSelector(state => state.courseSchedule.removeCourseSchedule);
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.open & !loaded) {
            dispatch(loadCourseSchedule(props.courseId));
            setLoaded(true);
        }
        if (!props.open && loaded)
            setLoaded(false);
    });
    const doRemove = (sId) => {
        dispatch(removeCourseSchedule({
            scheduleId: sId,
            courseId: props.courseId,
        }));
    }

    return (
        <Dialog open={props.open} aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">View Scheduled Course</DialogTitle>
            <DialogContent>
                {
                    courseScheduleStatus.data &&
                    courseScheduleStatus.data.scheduleTime &&
                    courseScheduleStatus.data.scheduleTime.map(schedule =>
                        <Paper variant="outlined" component={Grid} container
                            style={{
                                margin: "15px 10px", padding: "10px 20px",
                                background: 'rgba(115, 213, 110,0.3)'
                            }}>
                            <Grid item xs={10}>
                                <SecondaryText>
                                    <b>Date: </b>
                                    <Moment format="MMM DD, YYYY">
                                        {schedule.startTime}
                                    </Moment>
                                </SecondaryText>
                                <SecondaryText>
                                    <b>Time: </b>
                                    <Moment format="hh:mm A">
                                        {schedule.startTime}
                                    </Moment>
                                </SecondaryText>
                                <SecondaryText>
                                    <b>Capacity: </b>
                                    {schedule.capacity}
                                </SecondaryText>
                                <SecondaryText>
                                    <b>Participant: </b>
                                    {schedule.participant}
                                </SecondaryText>
                            </Grid>
                            <Grid item xs={2} style={{ textAlign: 'right' }}>
                                <IconButton size="small" color="secondary" disableFocusRipple disableRipple

                                    disabled={schedule.capacity <= schedule.participant}
                                    onClick={() => doRemove(schedule.id)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Paper>)
                }
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.onClose}>Cancel</Button>
                <Button color="primary" onClick={props.onAddNew}>Add New</Button>
            </DialogActions>
        </Dialog>
    );
}

const AddScheduleDialog = (props) => {
    const [loaded, setLoaded] = useState(true);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const createCourseScheduleStatus = useSelector(state => state.courseSchedule.createCourseSchedule);
    const dispatch = useDispatch();
    const doSubmit = (values, action) => {
        dispatch(createCourseSchedule({
            ...values,
            startTime: values.startTime.toJSON()
        }));
        action.setSubmitting(false);
    }
    useEffect(() => {
        if (props.open & !loaded) {
            dispatch(clearCreateState());
            setLoaded(true);
        }
        if (!props.open && loaded)
            setLoaded(false);
    });
    if (loaded && createCourseScheduleStatus.status === 'FULFILLED') {
        props.onClose();
    }
    return (
        <>
            {
                createCourseScheduleStatus.status === 'FULFILLED' &&
                <>
                    <Snackbar open autoHideDuration={3000} onClose={() => dispatch(clearCreateState())} >
                        <Alert severity="success">
                            Course Schedule Added Successfully
                        </Alert>
                    </Snackbar>
                </>
            }
            <Dialog open={props.open} aria-labelledby="form-dialog-title">
                <Formik
                    enableReinitialize
                    initialValues={{
                        startTime: selectedDateTime, capacity: 1,
                        courseId: props.courseId
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.capacity) {
                            errors.capacity = "Required";
                        }
                        if (!values.startTime) {
                            errors.startTime = "Required";
                        }
                        return errors;
                    }}
                    onSubmit={doSubmit}
                    isValid={createCourseScheduleStatus.status !== 'REJECTED'}
                >
                    {({ handleSubmit, isSubmitting, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle id="form-dialog-title">Schedule Course</DialogTitle>
                            <DialogContent>
                                {
                                    createCourseScheduleStatus.status === 'REJECTED' &&
                                    <Alert severity="error">
                                        {createCourseScheduleStatus.error.message}
                                    </Alert>
                                }
                                <DialogContentText>
                                    Select Your Course Start Time
                                </DialogContentText>
                                <Box style={{ display: 'flex', margin: "25px 10px" }}>
                                    <Field name="courseId" type="hidden" />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDateTimePicker
                                            value={selectedDateTime}
                                            onChange={setSelectedDateTime}
                                            label="Start Date Time"
                                            disablePast
                                            format="yyyy/MM/dd HH:mm"
                                            style={{ marginRight: '10px' }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <Field
                                        component={TextField}
                                        style={{ width: '100px' }}
                                        label="Capacity"
                                        name="capacity"
                                        type="number"
                                        disabled={isSubmitting}
                                    />
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" disabled={isSubmitting}
                                    onClick={props.onClose}>Cancel</Button>
                                <Button type="submit"
                                    disabled={isSubmitting}>Save</Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
}


