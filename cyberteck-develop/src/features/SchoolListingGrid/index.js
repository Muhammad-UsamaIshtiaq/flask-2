import React, { useEffect, useState } from "react";
import {
    Box, TableCell, TableHead, Typography, IconButton, TableRow,
    Table, TableBody, Paper, TableContainer, Collapse
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { PrimaryButtonOutlined, SecondaryText } from "../Atoms";
import { Link } from "react-router-dom"
import { loadAllSchool } from "./../../DataStore/SchoolReducer"
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import Data from "../../Data";
import { useAuthorize, useUserInfo } from "../Authentication/Authorize";


export default function SchoolListingGrid(props) {
    const isReresentative = useAuthorize("REPRESENTATIVE");
    const schoolListStatus = useSelector(state => state.school.loadAllSchool)
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (!mounted) {
            dispatch(loadAllSchool());
            setMounted(true)
        }
    }, [])

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>School Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            schoolListStatus.status === 'FULFILLED' &&
                            schoolListStatus.data &&
                            schoolListStatus.data
                                .map(
                                    schoolItem =>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {schoolItem.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {schoolItem.address}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="right">
                                                <Link component={PrimaryButtonOutlined}
                                                    to={`/schools/${schoolItem.id}/${schoolItem.name.replaceAll(' ','-')}`}> View</Link>
                                                {
                                                    isReresentative &&
                                                    <Link component={PrimaryButtonOutlined}
                                                        to={`/schools/${schoolItem.id}/${schoolItem.name.replaceAll(' ','-')}/edit`}> Edit</Link>
                                                }

                                            </TableCell>
                                        </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

