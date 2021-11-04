import { useEffect, useState } from "react";
import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  PrimaryButton,
  PrimaryText,
  AutoCompleteInputBox,
  TextInputBox,
} from "../../../features/Atoms";
import MediaUpload from "./../../../features/MediaUpload/media";
import { Field, Formik } from "formik";

import { Grid, Box, Paper } from "@material-ui/core";

import { convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Data from "../../../Data";

export default (props) => {
  const [blogCoverImage, setBlogCoverImage] = useState(
    props?.content?.coverImage
  );
  const bodyData = props?.content?.body ?? null;
  const [formErrors, setFormErrors] = useState({
    editor: false,
    coverImage: false,
  });
  const [editorState, setEditorState] = useState(
    bodyData
      ? EditorState.createWithContent(convertFromRaw(bodyData))
      : EditorState.createEmpty()
  );
  const [preview, setPreview] = useState(
    draftToHtml(convertToRaw(editorState.getCurrentContent()))
  );
  const imageUploadCallback = (img) => {
    setBlogCoverImage(img);
  };
  const onSubmit = (values) => {
    const bodyData = convertToRaw(editorState.getCurrentContent());
    let errorStatus = { editor: false, coverImage: false };
    if (bodyData.blocks[0].text.trim().length === 0) {
      errorStatus.editor = true;
    }
    if (!blogCoverImage) {
      errorStatus.coverImage = true;
    }
    if (errorStatus.editor || errorStatus.coverImage) {
      setFormErrors(errorStatus);
      return false;
    }

    props.publish({
      ...values,
      body: JSON.stringify(bodyData),
      coverImage: blogCoverImage,
    });
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Required";
    if (!values.category) errors.category = "Required";
    return errors;
  };

  const loadPreview = () => {
    setPreview(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Formik
          enableReinitialize
          initialValues={{
            ...props?.content,
          }}
          validate={validateForm}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4} component={Paper} variant="outlined">
                <Grid item xs={12}>
                  <TextInputBox name="title" label="Blog Title" />
                  <AutoCompleteInputBox
                    options={Object.keys(Data.Config.BlogCategory)}
                    getOptionLabel={(option) =>
                      Data.Config.get(
                        Data.Config.BlogCategory,
                        option,
                        "displayName"
                      )
                    }
                    setFieldValue={setFieldValue}
                    required
                    label="Blog Category"
                    name="category"
                  />
                </Grid>
                <Grid item xs={12}>
                  <p className="error-message">
                    {formErrors.coverImage ? "*Cover Image Required" : null}
                  </p>
                  <MediaUpload
                    imageUploadCallback={imageUploadCallback}
                    coverImage={blogCoverImage || props?.content?.coverImage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <p className="error-message">
                    {formErrors.editor ? "*Blog Data Required" : null}
                  </p>
                  <Box
                    style={{
                      textAlign: "left",
                      border: "1px solid lightgray",
                      minHeight: "60vh",
                      padding: 10,
                      marginTop: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Editor
                      editorState={editorState}
                      style={{ overflow: " hidden" }}
                      onEditorStateChange={setEditorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                    />
                  </Box>
                  <Grid item xs={12} style={{ marginTop: 10 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <PrimaryButton
                          className="marginGapBottom"
                          onClick={handleSubmit}
                          style={{ float: "right" }}
                        >
                          Publish
                        </PrimaryButton>
                      </Grid>
                      <Grid item xs={6}>
                        <PrimaryButton
                          className="marginGapBottom"
                          style={{ background: "#3498db", float: "left" }}
                          onClick={loadPreview}
                        >
                          Generate Preview
                        </PrimaryButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 40 }}>
                <PrimaryText>Preview</PrimaryText>
              </Grid>
              <Grid
                container
                spacing={4}
                component={Paper}
                variant="outlined"
                style={{
                  textAlign: "justify",
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <div
                  style={{ width: "100%" }}
                  dangerouslySetInnerHTML={{ __html: preview }}
                ></div>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};
