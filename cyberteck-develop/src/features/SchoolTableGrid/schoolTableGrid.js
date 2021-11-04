import React, { useEffect, useState } from "react";
import {
  Box,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableRow,
  Table,
  TableBody,
  Paper,
  TableContainer,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { PrimaryButton, PrimaryButtonOutlined, SecondaryText } from "../Atoms";
import { Link } from "react-router-dom";
import {
  loadAllSchool,
  loadAllEnrolledCourses,
} from "./../../DataStore/SchoolReducer";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import Data from "../../Data";
import { useAuthorize, useUserInfo } from "../Authentication/Authorize";

export default function SchoolTableGrid(props) {
  const isReresentative = useAuthorize("REPRESENTATIVE");
  const userInfo = useUserInfo();
  const schoolListStatus = useSelector(
    (state) => state.school.loadAllEnrolledCourses
  );

  console.log("schoolListStatus: ", schoolListStatus);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted && userInfo) {
      console.log("CALLING for school courses: ");
      dispatch(loadAllEnrolledCourses(userInfo));
      setMounted(true);
    }
  }, [userInfo]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>School Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schoolListStatus.status === "FULFILLED" &&
              schoolListStatus.data &&
              schoolListStatus.data.map((schoolItem) => (
                <Row schoolInfo={schoolItem} isReresentative={isReresentative}/>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function Row(props) {
  const { schoolInfo } = props;
  const [open, setOpen] = React.useState(false);
  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });
  const classes = useRowStyles();
  const [participantModalIsOpen, setParticipantModalIsOpen] = useState(false);
  const [participantList, setParticipantList] = useState([]);
  const ParticipantModal = (props) => {
    return (
      <Dialog
        maxWidth="xl"
        open={participantModalIsOpen}
        onClose={() => setParticipantModalIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Participant List</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Parent Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participantList.map((participant, index) => (
                  <TableRow>
                    <TableCell>
                      {`${participant.firstName} ${participant.lastName}`}
                    </TableCell>
                    <TableCell>{participant.parentEmail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    );
  };
  const showParticipant = (list) => {
    setParticipantList(list);
    setParticipantModalIsOpen(true);
  };
  return (
    <React.Fragment>
      {participantModalIsOpen && ParticipantModal()}
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* MAIN ROW */}
        <TableCell component="th" scope="row">
          {schoolInfo.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {schoolInfo.address}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          <Link
            component={PrimaryButtonOutlined}
            to={`/schools/${schoolInfo.id}/${schoolInfo.name.replaceAll(
              " ",
              "-"
            )}`}
          >
            View
          </Link>
          {props?.isReresentative && (
            <Link
              component={PrimaryButtonOutlined}
              to={`/schools/${schoolInfo.id}/${schoolInfo.name.replaceAll(
                " ",
                "-"
              )}/edit`}
            >
              {" "}
              Edit
            </Link>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Booked Slot</TableCell>
                    <TableCell>Total Slot</TableCell>
                    <TableCell align="right">Participants</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schoolInfo.courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell component="th" scope="row">
                        {course.title}
                      </TableCell>
                      <TableCell>{course.price}</TableCell>
                      <TableCell>{course.bookedSlot}</TableCell>
                      <TableCell>{course.totalSlot}</TableCell>
                      <TableCell align="right">
                        <PrimaryButton
                          onClick={() => showParticipant(course.participants)}
                        >
                          View
                        </PrimaryButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
