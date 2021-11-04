import Layout from "../Layout";
import "./schoolCreatePage.css";
import {
  HeaderBox,
  HeaderTitle,
  PageBlock,
  PrimaryButton,
  PrimaryText,
} from "./../../features/Atoms";
import { Grid, Container, Paper } from "@material-ui/core";
import coverImg from "./../../images/minecraft-animation.jpg";

import SchoolForm from "./Block/SchoolForm";
import { useParams, Link } from "react-router-dom";
import { loadSchool, clearStoreState } from "./../../DataStore/SchoolReducer";

import { loadSchoolCourse } from "./../../DataStore/SchoolCoursesReducer";
import { useEffect, useRef, useState } from "react";
import Data from "../../Data";
import { useDispatch, useSelector } from "react-redux";
import SchoolCourseForm from "./Block/schoolCourseForm";

export default function SchoolCreatePage(props) {
  const { schoolId } = useParams();
  const prevRef = useRef();
  const [mounted, setMounted] = useState(false);

  const loadSchoolDetails = useSelector(
    (state) =>
      (state.school &&
        state.school.loadSchool &&
        state.school.loadSchool.data) ||
      {}
  );
  const loadSchoolCourseDetails = useSelector(
    (state) =>
      (state.schoolCourses &&
        state.schoolCourses.loadSchoolCourse &&
        state.schoolCourses.loadSchoolCourse.data) ||
      []
  );

  const saveSchoolCourseState = useSelector(
    (state) =>
      (state.schoolCourses &&
        state.schoolCourses.saveSchoolCourse &&
        state.schoolCourses.saveSchoolCourse.status) ||
      []
  );

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  useEffect(() => {
    if (!mounted || prevRef.current !== schoolId) {
      dispatch(clearStoreState());
      if (schoolId) {
        dispatch(loadSchool(schoolId));
        dispatch(loadSchoolCourse(schoolId));
      }
      setMounted(true);
    }
    prevRef.current = schoolId;
  }, [schoolId]);

  useEffect(() => {
    if (saveSchoolCourseState === 'PENDING') {
      setIsOpen(false);
      setEditIndex(-1);
      console.log("PENDING")
    }
    if (saveSchoolCourseState === 'FULFILLED') {
      window.location.reload();
    }
  }, [saveSchoolCourseState]);


  const getCourseModal = () => {
    return (
      <SchoolCourseForm
        open={isOpen}
        schoolId={schoolId}
        courseInfo={loadSchoolCourseDetails[editIndex] ?? {}}
        handleClose={() => {
          setIsOpen(false);
          setEditIndex(-1);
        }}
      />
    );
  };
  const EditCourse = (index) => {
    setEditIndex(index);
    setIsOpen(true);
  };

  return (
    <Layout
      fillHeader
      className="detailsBlock"
      style={{ background: "#f6f7f7" }}
    >
      {loadSchoolDetails && loadSchoolDetails.name && (
        <HeaderBox style={{ paddingTop: "35%" }} coverPic={coverImg}>
          <HeaderTitle>
            {loadSchoolDetails.name}
            <br />
          </HeaderTitle>
        </HeaderBox>
      )}
      <PageBlock style={{ paddingTop: "7%", paddingBottom: "7%" }}>
        <Grid item xs={12}>
          <PrimaryText>
            {schoolId ? "Update" : "Create"}&nbsp;
            <b className="greenTextBackground">School</b>
            <br />
          </PrimaryText>
        </Grid>
        <Grid item xs={12}>
          <SchoolForm schoolInfo={loadSchoolDetails} />
        </Grid>
        <Grid container>
          {loadSchoolCourseDetails &&
            loadSchoolCourseDetails?.map((course, index) => (
              <Grid item md={4} key={index}>
                <CourseGridBlock
                  {...course}
                  onClick={() => EditCourse(index)}
                />
              </Grid>
            ))}
        </Grid>
        {schoolId && (
          <Grid item xs={12}>
            {isOpen && getCourseModal()}
            <PrimaryButton
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Add a course
            </PrimaryButton>
          </Grid>
        )}
      </PageBlock>
    </Layout>
  );
}

const CourseGridBlock = (props) => {
  return (
    <Paper style={{ padding: 10, textAlign: "left", margin: 10 }}>
      <h3 className={{ textAlign: "center" }}>{props?.title}</h3>
      <p>Grade: {props?.grade}</p>
      <p>Price: {props?.price}</p>
      <Link component={PrimaryButton} onClick={props?.onClick}>
        Edit
      </Link>
    </Paper>
  );
};
