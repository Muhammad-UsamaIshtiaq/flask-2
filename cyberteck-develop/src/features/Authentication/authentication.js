import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem, Button } from "@material-ui/core";
import { connect } from 'react-redux'
import "./authentication.css";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FaceIcon from '@material-ui/icons/Face';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { login, logout, resumeSession } from "./../../DataStore/AuthReducer";
import AuthenticationModal from "./AuthenticationModal";
import { AsynCallLoading } from './../Atoms';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import QueueTwoToneIcon from '@material-ui/icons/QueueTwoTone';

const Authentication = (props) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    props.resumeSession()
  }, [])

  const handleUserMenuClick = (event) => {
    setShowUserMenu(!showUserMenu);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setShowUserMenu(false);
  };

  const loginSubmit = (values, action) => {
    //setShowAuthModal(false);
    props.doLogin(values);
    action.setSubmitting(false);
  };

  const handleLogout = () => {
    handleClose();
    props.doLogout();
  }
  return (
    <>
      {
        props.userInfo
          ? <Button onClick={handleUserMenuClick}
            aria-controls="simple-menu" aria-haspopup="true"
            endIcon={<MoreVertIcon style={{ color: "white" }} />} >
            <b className="navLink" className="greenText">Hi, {props.userInfo?.name.split(' ')[0]} </b>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={showUserMenu}
              onClose={handleClose}
              className="dashboard"
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem component={Link} className="navLink" to="/dashboard">
                <FaceIcon style={{ paddingRight: 5 }} />Dashboard
              </MenuItem>
              {
                props.userInfo?.userType === 'REPRESENTATIVE' &&
                <MenuItem component={Link} className="navLink" to="/schools/create">
                  <QueueTwoToneIcon style={{ paddingRight: 5 }} />Create School
                </MenuItem>
              }
              {
                props.userInfo?.userType === 'TEACHER' &&
                <MenuItem component={Link} className="navLink" to="/courses/create">
                  <QueueTwoToneIcon style={{ paddingRight: 5 }} />Create Course
                </MenuItem>
              }
              <MenuItem onClick={handleLogout} className="navLink">
                <ExitToAppIcon style={{ paddingRight: 5 }} />Logout
              </MenuItem>
            </Menu>
          </Button>
          : <>
            <IconButton
              id="authButton"
              className="navLink"
              onClick={() => {
                setShowAuthModal(!showAuthModal);
              }}
            >
              <AccountCircleTwoToneIcon
                style={{ color: "rgb(255,255,255)" }}
              />
            </IconButton>
            <AuthenticationModal
              show={showAuthModal}
              onClose={() => { setShowAuthModal(false) }}
              loginSubmit={loginSubmit}
              loginStatus={props.loginStatus}
              error={props.loginStatus.error}
            />
          </>
      }
      <AsynCallLoading open={(props.loginStatus.status === 'PENDING')} />
    </>
  );
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth && state.auth.userInfo &&
      Object.keys(state.auth.userInfo).length > 0 && state.auth.userInfo,
    loginStatus: state.auth && state.auth.login
  };
};
const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(logout()),
    doLogin: (payload) => dispatch(login(payload)),
    resumeSession: () => dispatch(resumeSession()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);