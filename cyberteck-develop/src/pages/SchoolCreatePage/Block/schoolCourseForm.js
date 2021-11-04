import { Field, Formik } from "formik";
import {
  PrimaryButton,
  AutoCompleteInputBox,
  TextInputBox,
  SecondaryText,
} from "./../../../features/Atoms";
import Data from "./../../../Data";
import {
  Backdrop,
  Grid,
  Paper,
  CircularProgress,
  Modal,
  Container,
  Dialog,
  DialogContent,
  Switch
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { saveSchoolCourse } from "./../../../DataStore/SchoolCoursesReducer";

export default (props) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const dispatch = useDispatch();
  const initialData = {
    title: "",
    description: "",
    subTitle: "",
    subDescription: "",
    price: "",
    mrpPrice: "",
    grade: "",
    skillLevel: "",
    highlightPoints: [],
    courseCategory: "",
    courseType: "",
    duration: "",
    coverImage: "",
    totalSlot: "",
    slotDateTimes: [],
    isActive: 1,
  };
  const [slotDateTimes, setSlotDateTimes] = useState([]);
  const [courseIsActiveState, setCourseIsActiveState] = useState((props?.courseInfo?.isActive) ?? 0);
  const classes = useStyles();
  const [isOpenTimeEdit, setIsOpenTimeEdit] = useState({
    state: false,
    index: -1,
  });
  useEffect(() => {
    if (props?.courseInfo?.slotDateTimes) {
      setSlotDateTimes(props?.courseInfo?.slotDateTimes);
    } else {
      setSlotDateTimes([]);
    }
  }, []);
  const setSelectedDateTime = (data, index) => {
    if (!data) return;
    if (index < 0) {
      setSlotDateTimes([...slotDateTimes, data]);
    } else {
      let updatedTimes = [...slotDateTimes];
      updatedTimes[index] = data;
      setSlotDateTimes(updatedTimes);
    }
  };
  const validateForm = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Required";
    if (!values.description) errors.description = "Required";
    if (!values.grade) errors.grade = "Required";
    if (!values.duration) errors.duration = "Required";
    if (!values.price) errors.price = "Required";
    if (!values.mrpPrice) errors.mrpPrice = "Required";
    return errors;
  };
  const doSubmit = (values, action) => {
    const formData = {
      ...initialData,
      ...values,
      slotDateTimes: slotDateTimes,
    };
    dispatch(saveSchoolCourse({ ...formData, schoolId: props?.schoolId, isActive: courseIsActiveState }));
  };

  const setTimeEdit = (index) => {
    setIsOpenTimeEdit({ state: true, index: index });
  };
  const deleteTimeSlot = (index) => {
    let updatedTimeSlot = [];
    updatedTimeSlot = slotDateTimes.filter((timeSlot, i) => {
      return i != index;
    });
    setSlotDateTimes([...updatedTimeSlot]);
  };
  return (
    <Dialog
      open={props.open}
      onClose={props?.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <DialogContent>
        <Formik
          enableReinitialize
          initialValues={{
            ...initialData,
            ...(props.courseInfo || {}),
          }}
          validate={validateForm}
          onSubmit={doSubmit}
          className={classes.paper}
        >
          {({ handleSubmit, isSubmitting, setFieldValue, errors }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={4}
                component={Paper}
                variant="outlined"
                style={{ padding: "2%" }}
                direction="row"
              >
                <Field type="hidden" name="id" />
                <Grid item xs={12} md={12}>
                  <TextInputBox
                    name="title"
                    label="Title"
                    required
                    style={{ width: "100%" }}
                  />
                  <TextInputBox
                    style={{ margin: 10, marginLeft: 0, marginRight: 10 }}
                    type="number"
                    name="price"
                    label="Offered Price"
                    required
                  />
                  <TextInputBox
                    style={{ margin: 10, marginLeft: 0, marginRight: 10 }}
                    type="number"
                    name="mrpPrice"
                    label="Mrp Price"
                    required
                  />
                  <TextInputBox
                    style={{ margin: 10, marginLeft: 0, marginRight: 10 }}
                    name="duration"
                    label="Duration"
                    required
                  />
                  <TextInputBox
                    style={{ margin: 10, marginLeft: 0, marginRight: 10 }}
                    type="number"
                    name="totalSlot"
                    label="Total Slots"
                    required
                  />
                  <AutoCompleteInputBox
                    options={Object.keys(Data.Config.Grade)}
                    getOptionLabel={(option) =>
                      Data.Config.get(Data.Config.Grade, option, "displayName")
                    }
                    setFieldValue={setFieldValue}
                    required
                    label="Grade"
                    name="grade"
                  />
                  <AutoCompleteInputBox
                    multiple
                    style={{ width: "100%", margin: "10px 0" }}
                    options={[]}
                    getOptionLabel={(option) => option}
                    setFieldValue={setFieldValue}
                    label="Highlight Points"
                    multiple
                    freeSolo
                    name="highlightPoints"
                  />
                  <TextInputBox
                    style={{ width: "100%", margin: "10px 0" }}
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    required
                  />
                  {/* ================ IS ACTIVE ======================= */}
                  <SecondaryText>Course Enable</SecondaryText>
                  <Switch
                    name="isActive"
                    label="Course Enable"
                    value={courseIsActiveState}
                    checked={courseIsActiveState}
                    onChange={(event, checked) => {
                      setCourseIsActiveState(checked ? 1 : 0);
                    }}
                  />
                  <br />
                  {/* ================ IS ACTIVE ======================= */}
                  <Link
                    variant="contained"
                    component={PrimaryButton}
                    onClick={() => setTimeEdit(-1)}
                    style={{ margin: "10px 0" }}
                  >
                    ADD COURSE TIME
                  </Link>
                </Grid>
                <Grid item xs={12} md={12}>
                  {
                    <Dialog
                      open={isOpenTimeEdit.state}
                      onClose={() =>
                        setIsOpenTimeEdit({ state: false, index: -1 })
                      }
                    >
                      <DialogContent>
                        <ClasstimeSchedule
                          onSubmit={setSelectedDateTime}
                          index={isOpenTimeEdit.index}
                          slotDateTimes={slotDateTimes[isOpenTimeEdit.index]}
                        />
                      </DialogContent>
                    </Dialog>
                  }
                  {/* COURSE TIMING SLOTS */}
                  {slotDateTimes.map((timings, index) => (
                    <Paper style={{ padding: 5, float: "left", margin: 5 }}>
                      <SecondaryText>
                        <b>Date: </b>
                        <Moment format="MMM DD, YYYY">{timings}</Moment>
                      </SecondaryText>
                      <SecondaryText>
                        <b>Time: </b>
                        <Moment format="hh:mm A">{timings}</Moment>
                      </SecondaryText>
                      <Link
                        component={PrimaryButton}
                        onClick={() => setTimeEdit(index)}
                      >
                        Edit
                      </Link>
                      <Link
                        component={PrimaryButton}
                        onClick={() => deleteTimeSlot(index)}
                      >
                        Delete
                      </Link>
                    </Paper>
                  ))}
                </Grid>
                <PrimaryButton
                  style={{
                    width: "100%",
                    background: "#72d56e",
                    color: "white",
                  }}
                  type="submit"
                >
                  Save Course
                </PrimaryButton>
              </Grid>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const ClasstimeSchedule = (props) => {
  const [dateTime, setDateTime] = useState(props?.slotDateTimes ?? new Date());
  useEffect(() => {
    setDateTime(props.slotDateTimes ?? "");
  }, []);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <br />
      <KeyboardDateTimePicker
        value={dateTime}
        onChange={setDateTime}
        label="Start Date Time"
        disablePast
        format="yyyy/MM/dd hh:mm"
        style={{ margin: "10px 0" }}
      />
      <Link
        component={PrimaryButton}
        variant="contained"
        style={{ margin: 10 }}
        onClick={() => props?.onSubmit(dateTime, props.index)}
      >
        ADD
      </Link>
    </MuiPickersUtilsProvider>
  );
};
