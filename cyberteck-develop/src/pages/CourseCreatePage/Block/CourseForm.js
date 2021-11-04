import {
    PrimaryButton, AutoCompleteInputBox, TextInputBox
} from "./../../../features/Atoms"
import {
    Backdrop,
    Grid, Paper, CircularProgress
} from "@material-ui/core";
import { Field, Formik } from "formik";
import { connect } from 'react-redux'
import Data from './../../../Data'
import { saveCourse } from "./../../../DataStore/CourseReducer"
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom"

import MediaUpload from './../../../features/MediaUpload/media';
import { useState } from "react";

const initialData = {
    title: "",
    description: "",
    subTitle: "",
    subDescription: "",
    grade: "",
    skillLevel: "",
    duration: "",
    courseType: "",
    courseCategory: "",
    tools: "",
    price: "",
    mrpPrice: "",
    path: "",
    requirements: [],
    prerequisite: "",
    highlightPoints: []
}


function CourseForm(props) {
    const [courseImage, setCourseImage] = useState(null);

    const validateForm = (values) => {
        const errors = {};
        if (!values.title) errors.title = "Required";
        if (!values.description) errors.description = "Required";
        if (!values.subTitle) errors.subTitle = "Required";
        if (!values.subDescription) errors.subDescription = "Required";
        if (!values.grade) errors.grade = "Required";
        if (!values.skillLevel) errors.skillLevel = "Required";
        if (!values.duration) errors.duration = "Required";
        if (!values.courseType) errors.courseType = "Required";
        if (!values.courseCategory) errors.courseCategory = "Required";
        if (!values.price) errors.price = "Required";
        if (!values.mrpPrice) errors.mrpPrice = "Required";
        if (!courseImage && !values.coverImage) errors.coverImage = "Cover Image is Required";
        return errors;
    }


    const doSubmit = (values, action) => {
        props.doSave({
            ...values,
            coverImage: courseImage || values.coverImage,
        });
        action.setSubmitting(false);
    }
    return (
        <Formik
            enableReinitialize
            initialValues={{
                ...initialData, ...(props.courseInfo || {}),
            }}
            validate={validateForm}
            onSubmit={doSubmit}
        >
            {({ handleSubmit, isSubmitting, setFieldValue, errors }) => (
                <form onSubmit={handleSubmit} >
                    {
                        props.saveCourse.status === "FULFILLED"
                            ? <Alert
                                severity="success"
                                style={{ display: "flex", adding: "3px 9px" }}
                            >
                                Your Course is saved successfully.
                                <Link to={`/courses/${props.saveCourse.data.courseId}/new`}>View Course</Link>
                            </Alert>
                            : <Grid container spacing={4} component={Paper} variant="outlined"
                                style={{ padding: '2%' }} direction="row-reverse">
                                <Field type="hidden" name="id" />
                                <Grid item xs={12} md={4}>
                                    <AutoCompleteInputBox
                                        options={Object.keys(Data.Config.CourseType)}
                                        getOptionLabel={(option) => Data.Config.get(Data.Config.CourseType, option, 'displayName')}
                                        setFieldValue={setFieldValue}
                                        required
                                        label="Course Type"
                                        name="courseType" />
                                    <AutoCompleteInputBox
                                        options={Object.keys(Data.Config.Grade)}
                                        getOptionLabel={(option) => Data.Config.get(Data.Config.Grade, option, 'displayName')}
                                        setFieldValue={setFieldValue}
                                        required
                                        label="Grade"
                                        name="grade" />
                                    <AutoCompleteInputBox
                                        options={Object.keys(Data.Config.SkillLevel)}
                                        getOptionLabel={(option) => Data.Config.get(Data.Config.SkillLevel, option, 'displayName')}
                                        setFieldValue={setFieldValue}
                                        required
                                        label="Skill Level"
                                        name="skillLevel" />
                                    <AutoCompleteInputBox
                                        options={Object.keys(Data.Config.CourseCategory)}
                                        getOptionLabel={(option) => Data.Config.get(Data.Config.CourseCategory, option, 'displayName')}
                                        setFieldValue={setFieldValue}
                                        required
                                        label="Course Category"
                                        name="courseCategory" />
                                    <TextInputBox type="number" name="duration" label="Duration" required />
                                    <TextInputBox name="tools" label="Tools" />
                                    <TextInputBox type="number" name="price" label="Offered Price" required />
                                    <TextInputBox type="number" name="mrpPrice" label="Mrp Price" required />
                                    <TextInputBox name="path" label="Path" />
                                    <TextInputBox name="prerequisite" label="Prerequisite" />
                                    <MediaUpload imageUploadCallback={img => setCourseImage(img)}
                                        label="Cover Image"
                                        coverImage={courseImage || props.courseInfo.coverImage} />
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextInputBox name="title" label="Title" required />
                                    <TextInputBox name="description" label="Description" multiline rows={4} required />
                                    <TextInputBox name="subTitle" label="Sub Title" required />
                                    <TextInputBox name="subDescription" label="Sub Description" multiline
                                        rows={4} required />
                                    <AutoCompleteInputBox multiple
                                        options={Object.keys(Data.Config.Requirements)}
                                        getOptionLabel={(option) => Data.Config.get(Data.Config.Requirements, option, 'displayName')}
                                        setFieldValue={setFieldValue}
                                        label="Requirements"
                                        name="requirements" />
                                    <AutoCompleteInputBox multiple
                                        options={[]}
                                        getOptionLabel={(option) => option}
                                        setFieldValue={setFieldValue}
                                        label="Highlight Points"
                                        multiple
                                        freeSolo
                                        name="highlightPoints" />
                                    <PrimaryButton style={{ width: '100%' }} type="submit">Save Course</PrimaryButton>
                                    {
                                        (props.saveCourse.status === "REJECTED"
                                            || errors.coverImage)
                                        &&
                                        <Alert
                                            severity="error"
                                            style={{ display: "flex", adding: "3px 9px" }}
                                        >
                                            {errors.coverImage || props.saveCourse.error.message}
                                        </Alert>
                                    }
                                    {
                                        <Backdrop
                                            style={{ zIndex: "1000" }}
                                            open={props.saveCourse?.status === "PENDING"}
                                        >
                                            <CircularProgress color="inherit" />
                                        </Backdrop>
                                    }

                                </Grid>
                            </Grid>
                    }

                </form>)}
        </Formik>
    );
}
const mapStateToProps = state => {
    return {
        saveCourse: state.course && state.course.saveCourse,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        doSave: (payload) => dispatch(saveCourse(payload)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseForm);