import React, { useEffect } from "react";
import { Formik, Field } from "formik";
import { Dialog, Tabs, Tab, Paper, Backdrop } from "@material-ui/core";
import { PrimaryButton } from "./../Atoms/index";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import { a11yProps, TabPanel, TextInputBox, PasswordInputBox } from "./blocks";
import { Alert } from "@material-ui/lab";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./authentication.css";

function AuthenticationModal(props) {
  const { loginStatus } = props
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    if (!loading && loginStatus.status === 'PENDING') {
      setLoading(true);
    }
  },
    [loginStatus]);
  return (
    <>

      <Backdrop open={loginStatus.status === 'PENDING'}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        fullWidth
        open={props.show && loginStatus.status !== 'PENDING'}
        className="authDialog App"
        onClose={(event, reason) => {
          props.onClose(false);
        }}
      >
        <Paper style={{ width: "100%" }}>
          <Tabs
            variant="fullWidth"
            TabIndicatorProps={{ style: { background: "white" } }}
            value={value}
            onChange={(e, newval) => {
              setValue(newval);
            }}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              style={{
                padding: "15px",
                background: "#73d56e",
                color: "white",
              }}
              label="LOG IN"
              {...a11yProps(0)}
            />
            <Tab
              style={{
                padding: "15px",
                background: "#73d56e",
                color: "white",
              }}
              label="REGISTER"
              {...a11yProps(1)}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <AuthForm
              type="LOGIN"
              error={props.error}
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.password) {
                  errors.password = "Required";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={props.loginSubmit}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AuthForm
              error={props.error}
              type="REGISTER"
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Required";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "Password doesnt match";
                }
                return errors;
              }}
              onSubmit={props.loginSubmit}
            />
          </TabPanel>
        </Paper>
      </Dialog>
    </>
  );
}

const AuthForm = (props) => (
  <Formik
    enableReinitialize
    initialValues={{ formType: props.type, ...props.initialValues }}
    validate={props.validate}
    onSubmit={props.onSubmit}
    isValid={props.error && props.error.formType === props.type}
  >
    {({ handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit} style={{ width: "80%", margin: "auto" }}>
        {props.error && props.error.formType === props.type && (
          <Alert
            severity="error"
            style={{ display: "flex", adding: "3px 9px" }}
          >
            {props.error.message}
          </Alert>
        )}
        {props.type === "REGISTER" && (
          <TextInputBox
            disabled={isSubmitting}
            name="name"
            placeholder="Name"
            leftIcon={<PersonIcon className="inputBoxLeftIcon" />}
          />
        )}
        <TextInputBox
          disabled={isSubmitting}
          name="email"
          placeholder="Email"
          leftIcon={<EmailIcon className="inputBoxLeftIcon" />}
        />
        <Field type="hidden" name="formType" />
        <PasswordInputBox
          placeholder="Password"
          name="password"
          disabled={isSubmitting}
        />
        {props.type === "REGISTER" && (
          <PasswordInputBox
            placeholder="Confirm Password"
            name="confirmPassword"
          />
        )}
        <PrimaryButton
          type="submit"
          style={{ width: "100%" }}
          disabled={isSubmitting}
        >
          {props.type}
        </PrimaryButton>
        {/* <Button className="formForgotLink" to="/forgotpassword">
          Forgot Password?
        </Button> */}
      </form>
    )}
  </Formik>
);
export default AuthenticationModal;
