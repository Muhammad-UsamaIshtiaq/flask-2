import { Grid, Hidden, Box } from "@material-ui/core";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";
import { PrimaryText, PrimaryButton } from "./../../../features/Atoms";
import { Link } from "react-router-dom";
export default (props) => {
  const htmlBody = draftToHtml(props.blogData.body);
  return (
    <Grid container>
      <Grid item sm={12}>
        <Box style={{ textAlign: "justify" }} className="blogDetailContainerBox">
          <div
            className="blogDetails"
            dangerouslySetInnerHTML={{ __html: htmlBody }}
          ></div>
        </Box>
      </Grid>
    </Grid>
  );
};
