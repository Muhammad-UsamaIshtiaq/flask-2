import Layout from "../Layout";
import "./courseBookingPage.css";
import {
  HeaderBox,
  HeaderTitle,
  PageBlock,
  PrimaryButton,
  PrimaryText,
  SecondaryText,
  TextInputBox,
} from "./../../features/Atoms";

import PaypalIntregrationButton from "./PaypalIntregrationButton";

import { Formik } from "formik";
import {
  Button,
  Box,
  Grid,
  Stepper,
  StepLabel,
  Step,
  Snackbar,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import coverImg from "./../../images/minecraft-animation.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Data from "../../Data";
import DateFnsUtils from "@date-io/date-fns";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Alert, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  loadCourseSchedule,
  bookCourseSchedule,
} from "./../../DataStore/CourseScheduleReducer";

import { loadCourse } from "./../../DataStore/CourseReducer";

import { profileFetch, profileUpdate } from "./../../DataStore/AuthReducer";

import { useUserInfo } from "../../features/Authentication/Authorize";
import StripeCheckout from "react-stripe-checkout";

export default function CourseBookingPage(props) {
  const { courseId } = useParams();
  const scheduleDetails = useSelector(
    (state) =>
      (state.courseSchedule.loadCourseSchedule &&
        state.courseSchedule.loadCourseSchedule.data) ||
      {}
  );
  const profileData = useSelector((state) => state?.auth?.profileFetch?.data);
  const profileUpdateStatus = useSelector((state) => state?.auth?.profileUpdate?.status);

  const userInfo = useUserInfo();
  const bookScheduleStatus = useSelector(
    (state) => state.courseSchedule.bookCourseSchedule
  );
  const courseDetails = useSelector(
    (state) => (state.course.loadCourse && state.course.loadCourse.data) || {}
  );

  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [studentDetails, setStudentDetails] = useState({});
  const [bookSlotData, setBookSlotData] = useState({});
  useEffect(() => {
    if (!mounted && courseId) {
      dispatch(loadCourseSchedule(courseId));
      if (!(courseDetails.id === courseId)) {
        dispatch(loadCourse(courseId));
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(profileFetch(userInfo.userId));
  }, [mounted]);

  useEffect(() => {
    setStudentDetails(profileData);
  }, [profileData]);

  const steps = getSteps();
  const handleNext = (formData, action, type) => {
    if (type === "STUDENT") {
      setStudentDetails({ ...studentDetails, ...formData });
    }
    else if (type === "PARENT") {
      setStudentDetails({ ...studentDetails, ...formData });
      dispatch(profileUpdate({ ...formData, "userId": userInfo.userId }))
    }
    else {
      setBookSlotData({ ...formData });
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleBookSlot = (paymentMethod, token) => {
    dispatch(bookCourseSchedule({
      ...bookSlotData,
      ...studentDetails,
      tokenData: token,
      userId: userInfo && userInfo.userId,
     paymentMethod: paymentMethod
    }));
  };
  const handleStripePayment = (token) => {
    handleBookSlot("STRIPE", token)
  }
  const handlePaypalPayment = token => {
    handleBookSlot("PAYPAL", token)
  }


  return (
    <Layout className="detailsBlock">
      {scheduleDetails && (
        <HeaderBox style={{ paddingTop: "35%" }} coverPic={coverImg}>
          <HeaderTitle>
            {scheduleDetails.title}
            <br />
            <b style={{ background: "#73d56e" }}>
              {Data.Config.get(
                Data.Config.CourseType,
                scheduleDetails.courseType,
                "displayName"
              )}
            </b>
          </HeaderTitle>
        </HeaderBox>
      )}
      <PageBlock>
        <Grid item xs={12}>
          <PrimaryText>Choose Your Own Path</PrimaryText>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <br />
          <br />
          <Box>
            <Backdrop
              style={{ zIndex: "1000" }}
              open={bookScheduleStatus?.status === "PENDING"}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {bookScheduleStatus.status === "FULFILLED" && (
              <Alert severity="success">
                Your course slot has been booked successfully.
                <Link to={`/courses/${courseId}`}>View Course</Link>
              </Alert>
            )}
            {bookScheduleStatus.status === "REJECTED" && (
              <Alert severity="error">
                Failed to book slot with error
                {bookScheduleStatus.error.message}
              </Alert>
            )}

            <Grid container justifyContent="center">
              <Grid item xs={12} md={9} component="form">
                {activeStep === 0 && profileData?.dataStatus ? (
                  <StudentDetailsForm
                    onSubmit={handleNext}
                    initData={studentDetails}
                  />
                ) : null}
                {activeStep === 1 && profileData?.dataStatus ? (
                  <ParentDetailsForm
                    onSubmit={handleNext}
                    initData={studentDetails}
                    onBack={handleBack}
                  />
                ) : null}
                {(activeStep === 2 && profileUpdateStatus === 'FULFILLED') && (
                  <BookSlotForm
                    onSubmit={handleNext}
                    scheduleTimings={
                      scheduleDetails && scheduleDetails.scheduleTime
                    }
                    onBack={handleBack}
                    initData={bookSlotData}
                  />
                )}
                {activeStep === 3 &&
                  bookScheduleStatus.status !== "FULFILLED" &&
                  bookScheduleStatus.status !== "PENDING" && (
                    <Box>
                      <Button onClick={handleBack}>Back</Button>

                      <StripeCheckout
                        name="Cyberteck Academy"
                        amount={courseDetails.price * 100} // cents
                        currency="USD"
                        token={handleStripePayment}
                        stripeKey={Data.Config.Strip.publicKey}
                      // shippingAddress={true}
                      >
                        <PrimaryButton>{`Pay with Stripe $${courseDetails.price}`}</PrimaryButton>
                      </StripeCheckout>
                      {
                        console.log("COURSE DETAILS: ", courseDetails)
                      }
                      <PaypalIntregrationButton handlePaypalPayment={handlePaypalPayment} courseType="NORMAL_COURSE" amount={courseDetails.price} courseName={courseDetails.title} courseId={courseDetails.id}/>

                    </Box>
                  )}

                <div></div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </PageBlock>
    </Layout>
  );
}

const ParentDetailsForm = props => {
  return props?.initData?.dataStatus ? (
    <Box>
      <Formik
        initialValues={{
          parentEmail: "",
          addressLine1: "",
          pincode: "",
          contactNo: "",
          ...props.initData,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.parentEmail) {
            errors.parentEmail = "Required";
          }
          if (!values.addressLine1) {
            errors.addressLine1 = "Required";
          }
          if (!values.pincode) {
            errors.pincode = "Required";
          }
          if (!values.contactNo) {
            errors.contactNo = "Required";
          }
          return errors;
        }}
        onSubmit={(value, action) => props.onSubmit(value, action, "PARENT")}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form>
            <TextInputBox
              type="email"
              name="parentEmail"
              label="Parent's Email"
              required
            />
            <TextInputBox
              type="text"
              name="contactNo"
              label="Contact Number"
              required
            />
            <TextInputBox
              type="text"
              name="addressLine1"
              label="Address Line 1"
              required
            />
            <TextInputBox
              type="text"
              name="addressLine2"
              label="Address Line 2"
            />
            <TextInputBox
              type="text"
              name="pincode"
              label="Zip Code"
              required
            />
            <Button onClick={props.onBack}>Back</Button>
            <PrimaryButton onClick={handleSubmit}>Next</PrimaryButton>
          </form>
        )}
      </Formik>
    </Box>
  ) : null;
}

const StudentDetailsForm = (props) => {
  return props?.initData?.dataStatus ? (
    <Box>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          studentAge: "",
          grade: "",
          ...props.initData,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "Required";
          }
          if (!values.lastName) {
            errors.lastName = "Required";
          }
          if (!values.grade) {
            errors.grade = "Required";
          }
          if (!values.studentAge) {
            errors.studentAge = "Required";
          }
          return errors;
        }}
        onSubmit={(value, action) => props.onSubmit(value, action, "STUDENT")}
      >
        {({ handleSubmit, isSubmitting }) => (
          <form>
            <TextInputBox
              type="text"
              name="firstName"
              label="Student First Name"
              required
            />
            <TextInputBox
              type="text"
              name="lastName"
              label="Student Last Name"
              required
            />
            <TextInputBox
              type="number"
              name="grade"
              label="Student Grade"
              required
            />
            <TextInputBox
              type="number"
              name="studentAge"
              label="Student Age"
              required
            />
            <PrimaryButton onClick={handleSubmit}>Next</PrimaryButton>
          </form>
        )}
      </Formik>
    </Box>
  ) : null;
};
const BookSlotForm = (props) => {
  const [selectedDate, handleDateChange] = useState(
    props.initData ? new Date(props.initData.slotDate) : new Date()
  );
  const [timeSlot, setTimeSlot] = useState(
    props.initData ? props.initData.slotTime : null
  );
  const [timeSlotList, setTimeSlotList] = useState(null);
  const formatSlots = (timings) => {
    const newTimes =
      timings &&
      timings.map((item) => {
        const date = new Date(item.startTime);
        return {
          ...item,
          slotDate: date.toLocaleDateString(),
          slotTime: date.toLocaleTimeString(),
        };
      });
    return (
      newTimes &&
      newTimes.filter((item) => {
        return item.slotDate === selectedDate.toLocaleDateString();
      })
    );
  };
  const formattedSlotTimes = formatSlots(props.scheduleTimings);

  const isDayAvailable = (day) => {
    const selectedCalDate = day.toLocaleDateString();
    const slotDateList =
      props.scheduleTimings &&
      props.scheduleTimings.map((item) =>
        new Date(item.startTime).toLocaleDateString()
      );
    return slotDateList && !slotDateList.includes(selectedCalDate);
  };
  return (
    <Box component={Grid} container spacing={8}>
      <Formik
        initialValues={{
          scheduleId: timeSlot,
          slotDate:
            selectedDate.toJSON() && selectedDate.toJSON().split("T")[0],
          slotTime: timeSlot,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.slotDate) {
            errors.slotDate = "Required";
          }
          if (!values.scheduleId) {
            errors.scheduleId = "Required";
          }
          return errors;
        }}
        onSubmit={props.onSubmit}
      >
        {({
          handleSubmit,
          isSubmitting,
          setFieldValue,
          errors,
          submitCount,
        }) => (
          <>
            {submitCount > 0 && errors && (
              <Snackbar open>
                <Alert severity="error">
                  Please Select a valid Slot Time & Date
                </Alert>
              </Snackbar>
            )}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={12} md={7}>
                <DatePicker
                  autoOk
                  disablePast
                  variant="static"
                  openTo="date"
                  value={selectedDate}
                  onChange={(value) => {
                    handleDateChange(value);
                    setFieldValue("slotDate", value.toJSON().split("T")[0]);
                  }}
                  shouldDisableDate={isDayAvailable}
                  renderDay={(
                    day,
                    selectedDate,
                    dayInCurrentMonth,
                    dayComponent
                  ) => {
                    const selectedCalDate = day.toLocaleDateString();
                    const slotDateList =
                      props.scheduleTimings &&
                      props.scheduleTimings.map((item) =>
                        new Date(item.startTime).toLocaleDateString()
                      );
                    const isAvailable =
                      slotDateList && slotDateList.includes(selectedCalDate);
                    const background = isAvailable ? "#b3ffcc" : "";
                    return (
                      <div style={{ background: background }}>
                        {dayComponent}
                      </div>
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <Grid
                  component={ToggleButtonGroup}
                  container
                  exclusive
                  value={timeSlot}
                  alignItems="stretch"
                  style={{ height: "100%" }}
                  onChange={(e, v) => {
                    setTimeSlot(v);
                    setFieldValue("scheduleId", v);
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      textAlign: "left",
                      background: "#3f51b5",
                      color: "white",
                      display: "flex",
                    }}
                  >
                    <SecondaryText style={{ margin: "auto" }}>
                      Select Time Slot
                    </SecondaryText>
                  </Grid>
                  {formattedSlotTimes &&
                    formattedSlotTimes.map((item, index) => (
                      <ToggleButton
                        variant="contained"
                        disabled={item.capacity <= item.participant}
                        className={
                          "timeslot-selector " +
                          (item.capacity > item.participant
                            ? "available"
                            : "not-available")
                        }
                        component={Grid}
                        item
                        xs={6}
                        value={item.id}
                      >
                        {item.slotTime}
                      </ToggleButton>
                    ))}
                </Grid>
                <Grid xs={12} style={{ textAlign: "right" }}>
                  <Button onClick={props.onBack}>Back</Button>
                  <PrimaryButton onClick={handleSubmit}>Next</PrimaryButton>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </>
        )}
      </Formik>
    </Box>
  );
};

const getSteps = () => {
  return ["Student Details", "Parent Details", "Book Your Slot", "Make Payment"];
};
