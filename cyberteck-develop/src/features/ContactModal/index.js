import { Grid, DialogContent, Dialog, DialogTitle, } from "@material-ui/core";

import { PrimaryButton, TextInputBox, AutoCompleteInputBox, AsynCallLoading } from './../Atoms';
import { Alert } from "@material-ui/lab";

import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from './../../DataStore/AuthReducer';
import { Field, Formik } from "formik";
import Data from './../../Data';
import Config from "../../Data/Config";
export default (props) => {
    const contactUsStatus = useSelector(state => state.auth.contactUs);
    const dispatch = useDispatch();
    const handleFormSubmit = data => {
        // console.log("SUBMIT: ", formValues);
        console.log("SUBMIT: ", {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contactNo: data.phone,
            subject: data.interestedCourses,
            message: 'i am interested in a course'
        });
        // dispatch(contactUs());
        // props.handleClose();
    }
    return (
        <Dialog open={props.open} onClose={props.handleClose} maxWidth="lg" >
            <DialogTitle id="simple-dialog-title">Contact Us</DialogTitle>
            <DialogContent>
                <div style={{ minHeight: '40vh' }}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            firstName: '', lastName: '', email: '', phone: '', interestedCourses: ''
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.firstName) {
                                errors.firstName = "Required";
                            }
                            if (!values.lastName) {
                                errors.lastName = "Required";
                            }
                            if (!values.email) {
                                errors.email = "Required";
                            }
                            if (!values.phone) {
                                errors.phone = "Required";
                            }
                            if (!values.interestedCourses) {
                                errors.interestedCourses = "Required";
                            }
                            return errors;
                        }}
                        onSubmit={(data, action) => {
                            dispatch(contactUs({
                                name: data.firstName + data.lastName,
                                email: data.email,
                                contactNo: data.phone,
                                subject: data.interestedCourses,
                                message: 'i am interested in a course'
                            }));
                            action.setSubmitting(false);
                            action.resetForm();
                        }}
                    >
                        {({ handleSubmit, isSubmitting, setFieldValue }) => (
                            <form onSubmit={handleSubmit} >
                                {
                                    contactUsStatus.status === 'REJECTED' &&
                                    <Alert severity="error">
                                        {contactUsStatus.error.message}
                                    </Alert>
                                }
                                {
                                    contactUsStatus.status === 'FULFILLED' &&
                                    <Alert severity="success">
                                        Message sent successfully
                                        {
                                            props?.handleClose()
                                        }
                                    </Alert>
                                }
                                {
                                    (contactUsStatus.status === 'PENDING') && <AsynCallLoading open={(contactUsStatus.status === 'PENDING')}></AsynCallLoading>
                                }
                                <Grid container spacing={2} style={{ marginTop: 10 }}>
                                    <Grid item xs={6}>
                                        <TextInputBox name="firstName" label="Frist Name"
                                            disabled={isSubmitting} style={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextInputBox name="lastName" label="Last Name"
                                            disabled={isSubmitting} style={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextInputBox type="email" name="email" label="Email Address"
                                            disabled={isSubmitting} style={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextInputBox name="phone" label="Phone"
                                            disabled={isSubmitting} style={{ width: '100%' }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AutoCompleteInputBox
                                            options={Object.keys({ ...Data.Config.ContactUsOptions, ...Data.Config.CourseType, ...Data.Config.CourseCategory })}
                                            getOptionLabel={(option) => Data.Config.get({ ...Data.Config.ContactUsOptions,...Data.Config.CourseType, ...Data.Config.CourseCategory }, option, 'displayName')}
                                            setFieldValue={setFieldValue}
                                            required
                                            name="interestedCourses"
                                            label="Interested Courses" />
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'right', marginTop: 15}}>
                                        <PrimaryButton type="submit" style={{minWidth: '20ch',background: '#73d56e', color: 'white'}}>Submit</PrimaryButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </div>
            </DialogContent>
        </Dialog>
    )
}