import {
  PrimaryButton,
  AutoCompleteInputBox,
  TextInputBox,
} from "./../../../features/Atoms";
import { Backdrop, Grid, Paper, CircularProgress } from "@material-ui/core";
import { Field, Formik } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
import Data from "./../../../Data";
import { saveSchool } from "./../../../DataStore/SchoolReducer";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";

import MediaUpload from "./../../../features/MediaUpload/media";
import { useState } from "react";

const initialData = {
  name: "",
  description: "",
  address: "",
  coverImage: "",
  state: "",
};

export default function SchoolForm(props) {
  const saveSchoolStatus = useSelector(
    (state) => state.school && state.school.saveSchool
  );
  const dispatch = useDispatch();

  const [schoolImage, setSchoolImage] = useState(null);

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) errors.title = "Required";
    if (!values.description) errors.description = "Required";
    if (!values.address) errors.address = "Required";
    if (!values.state) errors.address = "Required";

    if (!schoolImage && !values.coverImage)
      errors.coverImage = "Cover Image is Required";
    return errors;
  };

  const doSubmit = (values, action) => {
    dispatch(
      saveSchool({
        ...values,
        coverImage: schoolImage || values.coverImage,
      })
    );
    action.setSubmitting(false);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...initialData,
        ...(props.schoolInfo || {}),
      }}
      validate={validateForm}
      onSubmit={doSubmit}
    >
      {({ handleSubmit, isSubmitting, setFieldValue, errors }) => (
        <form onSubmit={handleSubmit}>
          {saveSchoolStatus.status === "FULFILLED" ? (
            <Alert
              severity="success"
              style={{ display: "flex", adding: "3px 9px" }}
            >
              Your School Details is saved successfully.
              <Link to={`/schools/${saveSchoolStatus.data.schoolId}`}>
                View School
              </Link>
            </Alert>
          ) : (
            <Grid
              container
              spacing={4}
              component={Paper}
              variant="outlined"
              style={{ padding: "2%" }}
              direction="row-reverse"
            >
              <Field type="hidden" name="id" />
              <Grid item xs={12}>
                <TextInputBox name="name" label="Name" required />
                <TextInputBox
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  required
                />
                <TextInputBox
                  name="address"
                  label="Address"
                  multiline
                  rows={4}
                  required
                />
                <AutoCompleteInputBox
                  options={Object.keys(Data.Config.State)}
                  getOptionLabel={(option) =>
                    Data.Config.get(Data.Config.State, option, "displayName")
                  }
                  setFieldValue={setFieldValue}
                  required
                  label="State"
                  name="state"
                />
                <MediaUpload
                  imageUploadCallback={(img) => setSchoolImage(img)}
                  label="Cover Image"
                  coverImage={schoolImage || props.schoolInfo.coverImage}
                />
                <PrimaryButton style={{ width: "100%" }} type="submit">
                  Save School Details
                </PrimaryButton>
                {(saveSchoolStatus.status === "REJECTED" ||
                  errors.coverImage) && (
                  <Alert
                    severity="error"
                    style={{ display: "flex", adding: "3px 9px" }}
                  >
                    {errors.coverImage || saveSchoolStatus.error.message}
                  </Alert>
                )}
                {
                  <Backdrop
                    style={{ zIndex: "1000" }}
                    open={saveSchoolStatus?.status === "PENDING"}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                }
              </Grid>
            </Grid>
          )}
        </form>
      )}
    </Formik>
  );
}
