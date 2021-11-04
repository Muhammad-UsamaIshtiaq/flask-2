import React, { useState } from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";


export const PasswordInputBox = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <Field
      component={TextField}
      {...props}
      type={showPassword ? "text" : "password"}
      style={{
        padding: '7px 0px',
        background: "#f0f3f6",
        width: '100%',
        margin: "5px 0"
      }}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">
            <VpnKeyIcon className="inputBoxLeftIcon" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? (
                <VisibilityIcon style={{ color: "black" }} />
              ) : (
                <VisibilityOffIcon style={{ color: "black" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export const TextInputBox = (props) => {
  return (
    <Field
      component={TextField}
      {...props}
      style={{
        background: "#f0f3f6",
        padding: "7px 0",
        width: '100%',
        margin: "5px 0"
      }}
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start">{props.leftIcon}</InputAdornment>
        ),
      }}
    />
  );
};

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}