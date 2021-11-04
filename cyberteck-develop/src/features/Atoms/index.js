import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Container,
  Card,
  CardMedia,
  CardContent, FormControl, InputLabel, TextField as MTextField
} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Field } from "formik";
import { Select, TextField } from "formik-material-ui";
import { Autocomplete } from 'formik-material-ui-lab';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import "./atoms.css";
import { Link } from 'react-router-dom';
import tick_icon from "./../../images/tick_icon.png"

export const UIAlert = (props) => {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return <Snackbar open={props.open} autoHideDuration={2000}>
    <Alert severity={props.severity}>
      {props.message}
    </Alert>
  </Snackbar>;
};

export const AsynCallLoading = (props) => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: 999999999999,
      color: "#fff",
    },
  }));
  const classes = useStyles();
  return (
    <Backdrop
      style={{ zIndex: 199 }}
      className={classes.backdrop}
      open={props?.open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export const PrimaryButton = (props) => (
  <Box
    {...props}
    className={`primaryButton ${props.rounded && "buttonRadius"} ${props?.className}`}
    size="large"
    component={Button}
    disableGutters
    style={{ ...props.style }}
  >
    {props.children}
  </Box>
);

export const PrimaryButtonOutlined = (props) => (
  <Box
    {...props}
    className={`primaryButtonOutLined ${props.rounded && "buttonRadius"}`}
    size="large"
    component={Button}
    style={{ margin: 5, ...props.style }}
  >
    {props.children}
  </Box>
);

export const PrimaryText = (props) => (
  <Typography
    variant="h2"
    {...props}
    className={`primaryText ${props.className}`}
    style={{ ...props.style }}
  >
    {props.children}
  </Typography>
);

export const SecondaryText = (props) => (
  <Typography
    variant="body1"
    {...props}
    className={`secondaryTest ${props.className}`}
    style={{ ...props.style }}
  >
    {props.children}
  </Typography>
);

export const BodyText = (props) => (
  <Typography
    variant="body1"
    {...props}
    className={`bodyText ${props.className}`}
    component="p"
    style={{ ...props.style }}
  >
    {props.children}
  </Typography>
);

export const TickLabels = (props) => (
  <Typography
    variant="body1"
    {...props}
    className="bodyText"
    component="p"
    style={{ display: "flex", marginBottom: 15, marginTop: 10, ...props.style }}
  >
    {/* <DoneIcon
      className="greenText"
      fontSize="medium"
      style={{ marginRight: 4 }}
    /> */}
    <img src={tick_icon} style={{ width: 40, height: 35, marginRight: 5 }} />
    <BodyText>{props.label}</BodyText>
  </Typography>
);

export const HeaderTitle = (props) => (
  <Typography
    component="div"
    {...props}
    className={`headerTitle ${props.className}`}
    style={{ ...props.style }}
  >
    {props.children}
  </Typography>
);

export const HeaderDescription = (props) => (
  <Typography
    component="div"
    {...props}
    className={`headerDescription ${props.className}`}
    style={{ ...props.style }}
  >
    {props.children}
  </Typography>
);

export const HeaderBox = (props) => (
  <Box style={{ backgroundImage: `url(${props.coverPic}) `, ...props.style }} disableGutters className={`headerBox ${props?.className}`}>
    {/* <img src={props.coverPic} style={{ width: "100%" }} /> */}
    <Box className="headerBoxHolder">
      <Box className="headerBoxContainer" style={{ margin: props.fullWidth && 'auto' }}>
        <div>{props.children}</div>
      </Box>
    </Box>
  </Box>
);

export const PageBlock = (props) => (
  <Box
    {...props}
    style={{
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      textAlign: "center",
      backgroundPosition: "center",
      ...props.style,
    }}
  >
    <Container>
      <Grid
        {...props}
        container
        spacing={6}
        className="block"
        style={{ ...props.gridStyle }}
      >
        {props.children}
      </Grid>
    </Container>
  </Box>
);

export const CourseBlock = (props) => {
  console.log("COURSE TYPE: ", props?.courseType);
  return (<Card style={{ position: "relative" }}
    className="courseBlock" component={Link} to={props.to}>
    {
      (props?.courseType === 'At School Location') ? null : <Paper className="priceBadge" elivation={5} >
        <BodyText
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "white",
            paddingBottom: -4,
          }}
        >
          Price
        </BodyText>
        <Typography component="s" style={{ fontSize: 14, fontWeight: 500, color: "white" }}>
          ${props.mrpPrice}
        </Typography>
        <Typography style={{ fontSize: 15, fontWeight: 600, color: "white" }}>
          ${props.price}
        </Typography>
        <div className="priceBadgeShape" />
      </Paper>
    }
    <CardContent className="courseBlockLabel" style={{ lineHeight: 0.6 }}>
      Live&nbsp;
      <b className="greenText">Instructor</b>
      <p style={{ fontSize: 12 }}>{props.courseType}</p>
    </CardContent>
    <CardMedia component="img" image={props.coverPic} />
    <CardContent className="courseBlockLabel" >
      {props.label}
      <br />({props.grade})
    </CardContent>
  </Card>)
};

export const BlogThumbnail = (props) => (
  <Box item xs={12} sm={4} component={Grid} className="blogThumbnail">
    <Link to={`/blog/view/${props.id}`}>
      <div
        className="cover"
        style={{ backgroundImage: `url(${props.coverPic})` }}
      />
    </Link>
    <CardContent className="courseBlockLabel" style={{ textAlign: "left" }}>
      {props.title}
    </CardContent>
  </Box>
);

export const BannerTextLink = (props) => (
  <Box item className="blogThumbnail">
    <div
      className="cover bannerTextLink"
      style={{ backgroundImage: `url(${props.coverPic})` }}
    >
      <Box className="bannerTextLinkContainer">
        <div style={{ margin: "auto" }}>{props.children}</div>
      </Box>
    </div>
  </Box>
);

export const TextInputBox = (props) => {
  return (
    <Field
      style={{ marginBottom: '10px', marginTop: '10px', ...props.style }}
      component={TextField}
      {...props}
      variant="filled" className="inputBox"
      InputProps={{
        disableUnderline: true,
        style: {
          background: "#f0f3f6",
        }
      }}
    />
  );
};

export const SelectInputBox = (props) => {
  return (
    <FormControl variant="filled" className="inputBox" >
      <InputLabel id={props.name}>{props.label}</InputLabel>
      <Field disableUnderline
        labelId={props.name}
        component={Select}
        {...props}
        style={{ textAlign: 'left', backgroundColor: '#f0f3f6', width: '100%' }}
      >
        {props.children}
      </Field>
    </FormControl>
  );
};

export const AutoCompleteInputBox = (props) => {
  return (
    <Field
      {...props}
      component={Autocomplete}
      className="inputBox"
      required
      renderInput={(params) =>
        <MTextField  {...params} InputProps={{
          disableUnderline: true,
          style: {
            background: "#f0f3f6",
          },
          ...params.InputProps
        }} required={props.required}
          label={props.label} variant="filled" />
      }
    />
  );
};


