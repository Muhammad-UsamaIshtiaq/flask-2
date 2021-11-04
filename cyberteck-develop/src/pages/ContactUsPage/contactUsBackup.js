<PageBlock style={{
                backgroundImage: `url(${cu_bg})`, paddingTop: "18%",
                paddingBottom: '15%'
            }}>
                <Grid item xs={12} md={6} style={{ textAlign: 'left' }}>
                    <PrimaryText>Contact Us</PrimaryText>
                    <br />
                    <BodyText>
                        Experience in building futures. This is what our services deliver through
                        Computer Courses, Tech Camps and Virtual Tutoring. We make a commitment to
                        develop essential tech skills for tomorrow’s professionals. Our Tech oriented
                        courses are easily accessible at School locations or online at Home. Together
                        with personalized tutoring, any academic or professional paths are open to exploring.
                    </BodyText>
                    <Grid container style={{ paddingTop: 26 }} spacing={6}>
                        <Grid item xs={12} md={7}
                            style={{ display: 'flex' }}>
                            <EmailIcon style={{ fontSize: 37, color: 'rgb(115, 213, 110)' }} />
                            &nbsp;&nbsp;&nbsp;
                            <Box>
                                <SecondaryText style={{ margin: 0 }}>Email</SecondaryText>
                                <BodyText>info@cyberteckacademy.com</BodyText>
                            </Box>
                        </Grid>
                        {/* <Grid item xs={12} md={5}
                            style={{ display: 'flex' }}>
                            <PhoneIcon style={{ fontSize: 37, color: 'rgb(115, 213, 110)' }} />
                            &nbsp;&nbsp;&nbsp;
                            <Box>
                                <SecondaryText style={{ margin: 0 }}>PHONE</SecondaryText>
                                <BodyText>(703) 589-9078</BodyText>
                            </Box>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '6% ' }}>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                name: '', email: '', subject: '', message: ''
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.name) {
                                    errors.name = "Required";
                                }
                                if (!values.email) {
                                    errors.email = "Required";
                                }
                                if (!values.subject) {
                                    errors.subject = "Required";
                                }
                                if (!values.message) {
                                    errors.message = "Required";
                                }
                                return errors;
                            }}
                            onSubmit={(data, action) => {
                                dispatch(contactUs(data));
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
                                        </Alert>
                                    }
                                    <TextInputBox name="name" label="Name"
                                        disabled={isSubmitting} />
                                    <TextInputBox type="email" name="email" label="Email Address"
                                        disabled={isSubmitting} />
                                    <TextInputBox name="subject" label="Subject"
                                        disabled={isSubmitting} />
                                    <TextInputBox name="message" label="Message" multiline
                                        disabled={isSubmitting} rows={4} />
                                    <PrimaryButton type="submit">Submit</PrimaryButton>
                                </form>
                            )}
                        </Formik>
                    </Paper>
                </Grid>
            </PageBlock>
            {/*
            <PageBlock>
                <Grid item xs={9} style={{ margin: 'auto' }}>
                    <Box container component={Grid} spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Paper style={{ padding: '6%' }}>
                                <img src={whychooseicon5} style={{ width: '25%' }} />
                                <br /><br />
                                <SecondaryText>COURSE</SecondaryText>
                                <BodyText>
                                    Experience in building futures. This is what our services deliver.
                                </BodyText>
                                <br />
                                <Link to="/course" component={PrimaryButton} rounded>BROWSE</Link>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper style={{ padding: '6%' }}>
                                <img src={whychooseicon5} style={{ width: '25%' }} />
                                <br /><br />
                                <SecondaryText>STUDENT PORTAL</SecondaryText>
                                <BodyText>
                                    Experience in building futures. This is what our services deliver.
                                </BodyText>
                                <br />
                                <Link to="/coming-soon" component={PrimaryButton} rounded>BROWSE</Link>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper style={{ padding: '6%' }}>
                                <img src={whychooseicon5} style={{ width: '25%' }} />
                                <br /><br />
                                <SecondaryText>CAREERS</SecondaryText>
                                <BodyText>
                                    Experience in building futures. This is what our services deliver.
                                </BodyText>
                                <br />
                                <Link to="/coming-soon" component={PrimaryButton} rounded>BROWSE</Link>
                            </Paper>
                        </Grid>
                    </Box>
                </Grid>
            </PageBlock>
            <PageBlock>
                <Grid item xs={12}>
                    <PrimaryText style={{ textAlign: 'left' }}>General Questions</PrimaryText>
                </Grid>
                <Grid item xs={12} md={6}>
                    {
                        faqdata &&
                        faqdata[0]?.faqSegment.map(data =>
                            <QuestionBlock data={data} />
                        )
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    {
                        faqdata &&
                        faqdata[1]?.faqSegment.map(data =>
                            <QuestionBlock data={data} />
                        )
                    }
                </Grid>
            </PageBlock> */}
            <Grid container style={{
                backgroundColor: '#339966',
                padding: '2% 10%'
            }}>
                <Grid item xs={12} md={8}>
                    <PrimaryText style={{ fontSize: '33px', color: 'white' }}>Want quick answers to questions?</PrimaryText>
                </Grid>
                <Grid item xs={12} md={4} style={{ textAlign: 'left' }}>
                    <Link to="/faq" component={PrimaryButton} rounded>Visit FAQ Page</Link>
                </Grid>
            </Grid>