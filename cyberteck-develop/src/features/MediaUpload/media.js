import { Grid, Box, Paper, Button, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { AsynCallLoading } from './../Atoms';

import API from "../../Api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default (props) => {
  // on success entry
  const classes = useStyles();
  const fileName = props?.coverImage ?? false;
  const [uploadStatus, setUploadStatus] = useState(false);
  //const [uploadedfile, setUploadedfile] = useState(fileName);

  const fileUpload = (event) => {
    //setUploadedfile(event.target.files[0].name);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    const options = {
      method: 'POST',
      body: formData,

    };
    setUploadStatus(true);
    fetch(API.Media.post(), options)
      .then(data => data.json())
      .then(res => {
        console.log(res);
        setUploadStatus(false);
        if (res.data?.file_name) {
          //setUploadedfile(res?.data?.file_name);
          console.log("data: ", res?.data?.file_name);
          props.imageUploadCallback(res?.data?.file_name);
        } else {
          //setUploadedfile(false)
        }
      })
  }

  return (
    uploadStatus ? <AsynCallLoading open={uploadStatus} /> : <Grid container>
      <Grid item xs={12}>
        <p style={{ textAlign: 'left', marginLeft: 10, fontSize: 14 }}>*image resolution should be 1200x640</p>
      </Grid>
      <Grid item className={classes.root}>
        <InputLabel shrink>{props.label}</InputLabel>
        <input
          accept="image/*"
          id="uploadMedia"
          type="file"
          className={classes.input}
          onChange={fileUpload}
        />
        <label htmlFor="uploadMedia">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </Grid>
      <Grid item className={classes.root}>
        <p>{fileName || "No file Selected"}</p>
      </Grid>
    </Grid>

  );
};
