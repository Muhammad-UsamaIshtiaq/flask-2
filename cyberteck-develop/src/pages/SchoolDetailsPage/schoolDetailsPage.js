import Layout from "../Layout";
import "./schoolDetailsPage.css";
import {
  BodyText,
  HeaderBox,
  HeaderDescription,
  HeaderTitle,
  PageBlock,
  PrimaryButton,
  PrimaryText,
  SecondaryText,
} from "./../../features/Atoms";
import { Box, Grid, Paper, Typography, Container } from "@material-ui/core";
import coverImg from "./../../images/minecraft-animation.jpg";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadSchool } from "./../../DataStore/SchoolReducer";
import { useEffect, useState } from "react";
import Data from "../../Data";
import Api from "../../Api";
import tick_icon from "./../../images/tick_icon.png";
import school_aboutus from "./../../images/school_aboutus.png";
import ctaImg from "./../../images/ctaImg.png";
import TodayIcon from "@material-ui/icons/Today";
import { loadSchoolCourse } from "./../../DataStore/SchoolCoursesReducer";
import Moment from "react-moment";
import moment from "moment";
import CourseBookingModal from "./Blocks/courseBookingModal";
import EditIcon from "@material-ui/icons/Edit";
import { useAuthorize } from "./../../features/Authentication/Authorize";

export default function SchoolDetailsPage(props) {
  const { schoolId } = useParams();
  const isStudent = useAuthorize("STUDENT");
  const schoolDetails = useSelector(
    (state) => (state.school.loadSchool && state.school.loadSchool.data) || {}
  );
  const isRepresentative = useAuthorize("REPRESENTATIVE");
  const loadSchoolCourseDetails = useSelector(
    (state) =>
      (state.schoolCourses &&
        state.schoolCourses.loadSchoolCourse &&
        state.schoolCourses.loadSchoolCourse.data) ||
      []
  );
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted && schoolId) {
      dispatch(loadSchool(schoolId));
      dispatch(loadSchoolCourse(schoolId));
      setMounted(true);
    }
  }, [schoolId]);
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const [courseInfoToBook, setCourseInfoTobook] = useState(null);
  const bookCourse = (courseInfo) => {
    if (isStudent) {
      setCourseInfoTobook(courseInfo);
      setIsOpenBookingModal(true);
    } else {
      document.getElementById("authButton")?.click();
    }
  };
  const loadBookingModal = () => {
    return (
      <CourseBookingModal
        schoolId={schoolId}
        courseInfo={courseInfoToBook}
        isOpen={isOpenBookingModal}
        handleClose={() => setIsOpenBookingModal(false)}
      />
    );
  };
  return (
    <Layout className="detailsBlock">
      {schoolDetails && (
        <HeaderBox
          style={{ paddingTop: "35%" }}
          coverPic={
            schoolDetails.coverImage &&
            Api.Media.getImage(schoolDetails.coverImage)
          }
        >
          <HeaderTitle>
            {isRepresentative && (
              <Link
                className="defaultLink"
                to={`/schools/${
                  schoolDetails?.id
                }/${schoolDetails?.name?.replace(" ", "-")}/edit`}
              >
                <EditIcon />
              </Link>
            )}{" "}
            {schoolDetails.name}
            <br />
          </HeaderTitle>
          <SecondaryText
            className="marginGapBottom"
            style={{ fontSize: 20, color: "#72d66d", fontWeight: 600 }}
          >
            {schoolDetails?.address?.split(",")[0]}
          </SecondaryText>
        </HeaderBox>
      )}
      <Container maxWidth="lg">
        <Paper elevation={2} style={{ padding: "2%" }}>
          <Grid container spacing={2}>
            {loadSchoolCourseDetails?.map((course) => (
              <CourseBlock courseInfo={course} bookCourse={bookCourse} />
            ))}
          </Grid>
        </Paper>
        {isOpenBookingModal && loadBookingModal()}
      </Container>

      <PageBlock>
        <Grid
          item
          xs={12}
          md={6}
          style={{ textAlign: "left", paddingTop: "10%" }}
        >
          <PrimaryText style={{ fontSize: "38px" }} className="marginGapBottom">
            Dont know what computer courses to choose for your child?
          </PrimaryText>
          <BodyText className="marginGapBottom">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </BodyText>
          <Link to="/contactus" className="defaultLink">
            <PrimaryButton
              className="marginGapBottom"
              style={{ padding: 10, minWidth: "30ch", borderRadius: 40 }}
            >
              Contact Us
            </PrimaryButton>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={school_aboutus} style={{ width: "85%" }} />
        </Grid>
      </PageBlock>
      <PageBlock
        style={{ width: "100%", background: "#72d56e", minHeight: "40vh" }}
      >
        <Grid container>
          <Grid item xs={6}>
            <img src={ctaImg} style={{ width: "85%", objectFit: "contain" }} />
          </Grid>
          <Grid item xs={6} style={{ padding: "5%" }}>
            <PrimaryText
              style={{ fontSize: "30px", textAlign: "left", color: "#fff" }}
              className="marginGapBottom"
            >
              Will you try our online virtual classes ?
            </PrimaryText>
            <BodyText
              className="marginGapBottom"
              style={{ textAlign: "left", padding: "2%", color: "#fff" }}
            >
              Do you want to expand your horizon and be a part of programming
              evolution? Would you like to become proficient in Linux Kernel
              Module Programming to gain skills that are valued by the
              programming industry?
            </BodyText>
            <Grid item style={{ textAlign: "left" }}>
              <Link to="/courses" className="defaultLink">
                <PrimaryButton
                  className="marginGapBottom"
                  style={{
                    padding: 10,
                    minWidth: "30ch",
                    borderRadius: 40,
                    background: "#106a75",
                  }}
                >
                  View Courses
                </PrimaryButton>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </PageBlock>
    </Layout>
  );
}

const TickLabels = (props) => (
  <Typography
    variant="body1"
    {...props}
    className="bodyText"
    component="p"
    style={{ display: "flex", marginBottom: 15, marginTop: 10, ...props.style }}
  >
    <img
      src={tick_icon}
      style={{ width: "9%", marginRight: 10, objectFit: "contain" }}
    />
    <BodyText style={{ fontSize: "16px", lineHeight: "18px" }}>
      {props.label}
    </BodyText>
  </Typography>
);

const CourseBlock = (props) => {
  if(props?.courseInfo?.isActive)
  return (
    <Grid item xs={12} md={6}>
      <Paper style={{ padding: "2%", border: "2px solid #72d66d" }}>
        <Grid container>
          <Grid item xs={12}>
            <h3 style={{ textAlign: "center" }}>{props?.courseInfo?.title}</h3>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{ padding: "2%" }}
            >
              <Grid item xs={6}>
                <h3>Grade {props?.courseInfo?.grade}</h3>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                {/* HIDDEN AS PER REQ */}
                {/* <PrimaryButton style={{ backgroundColor: "#ff3e6c" }}>
                  Slot:{" "}
                  {props?.courseInfo?.totalSlot - props?.courseInfo?.bookedSlot}{" "}
                  left
                </PrimaryButton> */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/* schedule data info */}
            {props?.courseInfo?.slotDateTimes?.map((slotTime) => (
              <ClassDateSection timings={slotTime} />
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ textAlign: "right" }}
            className="marginGapBottom"
          >
            <PrimaryButton
              className="marginGapBottom"
              onClick={() => props?.bookCourse(props?.courseInfo)}
            >
              Register
            </PrimaryButton>
          </Grid>
          <Grid item xs={12} style={{ padding: "5%" }}>
            <h3>Course Description</h3>
            <BodyText className="marginGapTop">
              {props?.courseInfo?.description}
            </BodyText>
            <Paper style={{ padding: "5%", marginTop: 20 }}>
              <h3>
                In this Course{" "}
                <span style={{ color: "#72d66d" }}>you will</span>{" "}
              </h3>
              {props?.courseInfo?.highlightPoints?.map((point) => (
                <TickLabels label={point} />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <PrimaryButton
              style={{ padding: 20, minWidth: "40ch", borderRadius: 40 }}
              onClick={() => props?.bookCourse(props?.courseInfo)}
            >
              Register For this Course
            </PrimaryButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
  return (<></>)
};

const ClassDateSection = (props) => {
  const classTime = moment(props?.timings);
  return (
    <Grid
      container
      style={{ background: "#106a75", padding: "2%", margin: "10px 0" }}
    >
      <Grid item xs={8}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            fontSize: 17,
            color: "#fff",
            fontWeight: 600,
          }}
        >
          <TodayIcon style={{ color: "#72d66d", fontSize: 33 }} />
          {/* <span style={{ marginLeft: 10 }}>10-12-2021</span> */}
          <span style={{ marginLeft: 10 }}>
            <Moment format="MMM DD, YYYY">{props?.timings}</Moment>
          </span>
        </div>
      </Grid>
      <Grid item xs={4} style={{ textAlign: "right" }}>
        <div
          style={{
            display: "flex",
            alignItems: "right",
            flexWrap: "wrap",
            fontSize: 17,
            color: "#fff",
            fontWeight: 600,
            justifyContent: 'flex-end'
          }}
        >
          <span style={{ marginLeft: 10, marginTop: 5 }}>
            <div style={{ textAlign: "right" }}>
              <Moment format="hh:mm A">{classTime}</Moment>
            </div>
          </span>
        </div>
      </Grid>
    </Grid>
  );
};
