import Layout from "../Layout";
import "./contactUsPage.css";
import { BodyText, PageBlock, PrimaryButton, PrimaryText, SecondaryText, TextInputBox } from "../../features/Atoms";
import { Grid, Paper, Typography, ButtonBase, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { Field, Formik } from "formik";
import cu_bg from "./../../images/cu_bg-1024x782.png"
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { QuestionBlock } from "./../FaqPage/Block/faqSection"
import whychooseicon5 from "./../../images/whychooseicon5.png"


import contactIcon1 from "./../../images/contactIcon1.png"
import contactIcon2 from "./../../images/contactIcon2.png"
import contactIcon3 from "./../../images/contactIcon3.png"
import message  from "./../../images/message.png"




import faqdata from "../FaqPage/faqdata";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "./../../DataStore/AuthReducer"



export default function ContactUsPage(props) {

    const contactUsStatus = useSelector(state => state.auth.contactUs);
    const dispatch = useDispatch();

    return (

        <Layout fillHeader >
               <section className="heroBgContact">
                 <div className="uk-container" >
                   <div className="uk-grid  " data-uk-grid>
                     <div className="uk-width-3-4@s">
                      <div className="uk-margin-xlarge-top " >
                          <h1 className="header1 light withPadding" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Contact Us </h1>
                          <p className="subTitleText" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Your success elevated, one email away. </p>
                      </div>

                      
  
                    </div>

                       <div className="uk-width-1-4@s">
                     
                      </div>
                   </div>
                  </div>  
                 
                 </section>   



                <section className="Contact_UsBg">
               <div className="uk-container uk-margin-medium-bottom">
                     <div className="uk-grid" data-uk-grid>
                              <div className="uk-width-1-2@s">
                                  <div className="uk-padding">
                                   <p className="uk-text-justify">Experience in building futures. This is what our 
                                       services deliver through Computer Courses, Tech
                                        Camps and Virtual Tutoring. We make a commitment 
                                        to develop essential tech skills for tomorrow’s
                                         professionals. </p>
                                        <p className="uk-text-justify"> Our Tech oriented courses are easily
                                          accessible at School locations or online at Home.
                                           Together with personalized tutoring, any academic or
                                            professional paths are open to exploring.</p>
                                </div>

                                <div className=" uk-padding">
                                      <div className="uk-flex ">
                                          <div className="icon" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                                              <img src= {message} />
                                           </div>

                                          <div className="uk-margin-left" >
                                              <h6 className="uk-text-bold" style={{position:"relative",bottom:-14}} uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Email</h6>
                                              <p uk-scrollspy="cls: uk-animation-slide-right; repeat: true">info@cyberteck.com</p>
                                          </div>
                                          
                                      </div>        
                                </div>

                              </div>

                              <div className="uk-width-1-2@s">

                             <div uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true"> 
                              <Grid >
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
                    </div>
                              </div>
                    </div>
               </div>
          </section>


          <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
                <div className="uk-flex uk-flex-center">
                      <div className="mediumContainerLarge">
                      <div class="uk-text-center" data-uk-grid>
                                        <div class="uk-width-1-3@s" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                            <div class="uk-card uk-card-default uk-card-body">
                                                <div className="uk-flex-center uk-flex">
                                                    <div className="iconDiv">
                                                            <img src={contactIcon1} className="iconBig"/>
                                                            <h6 className="uk-margin-remove uk-text-bold">Courses</h6>
                                                            <p className="iconParagraphSmall uk-padding-small">Nulla quis lorem ut libero malesuada?</p>
                                                            <Link to="/courses"><div class=" uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">See all Courses</div> </Link>
                                    
                                                    </div>
                                                </div>
                                                
                                                </div>
                                        </div>


                                            <div class="uk-width-1-3@s" wuk-scrollspy="cls: uk-animation-slide-bottom; repeat: true">
                                                <div class="uk-card uk-card-default uk-card-body">
                                                    <div className="uk-flex-center uk-flex">
                                                        <div className="iconDiv">
                                                                <img src={contactIcon2} className="iconBig"/>
                                                                <h6 className="uk-margin-remove uk-text-bold">Students Portal</h6>
                                                                <p className="iconParagraphSmall uk-padding-small">Nulla quis lorem ut libero malesuada?</p>
                                                                <Link to="/courses"><div class=" uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Login</div> </Link>
                                        
                                                        </div>
                                                    </div>
                                                    
                                                    </div>
                                            </div>





                                            <div class="uk-width-1-3@s" uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
                                                <div class="uk-card uk-card-default uk-card-body">
                                                    <div className="uk-flex-center uk-flex">
                                                        <div className="iconDiv">
                                                                <img src={contactIcon3} className="iconBig"/>
                                                                <h6 className="uk-margin-remove uk-text-bold">Careers</h6>
                                                                <p className="iconParagraphSmall uk-padding-small">Nulla quis lorem ut libero malesuada?</p>
                                                                <Link to="/courses"><div class=" uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">View Roless</div> </Link>
                                        
                                                        </div>
                                                    </div>
                                                    
                                                    </div>
                                            </div>
                     </div>
                      </div>
                </div>

          </div>



            <div className="uk-container uk-margin-xlarge-top">
                <div className="uk-grid" data-uk-grid>
                      <div className="uk-width-1-2@s">
                         <div>
                             <h1 className="header1">General Questions</h1>
                             <div className="accordionContainer uk-margin-large-top">
                                  <ul uk-accordion="collapsible: false" uk-scrollspy="cls: uk-animation-slide-top-medium; repeat: true">

                                                    <li uk-scrollspy="cls: uk-animation-fade4; repeat: true">
                                                        <a class="uk-accordion-title accHeader" href="#">Opportunities for all students, no matter the background</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Our courses build skills for the future and everyone is entitled to access education. That is why we offer
                                                                 scholarships to qualified underprivileged students and create equal chances for all.</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Selection of courses that teach in-demand tech skills</a>
                                                        <div class="uk-accordion-content">
                                                            <p>We chose courses that are proven to build students’ skills for tomorrow. Classes with projects that cover programming like Python, 
                                                                robotics and drone engineering, 3D printing or game design and video animation.</p>
                                                        </div>
                                                    </li>
                                               

                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Top Tech Experts guide through the world of tech</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Qualified teachers selected from top tech universities make sure knowledge
                                                                 is built at the right pace and made easy for all to understand.
</p>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">You can bring us to your Location</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Besides existing collaborators, CyberTeck Academy teams up with more: Private Schools, Churches,
                                                                 Home School Groups, Sport Leagues or Parks & Rec Centers to meet your needs. Recommend us and we’ll make it happen.</p>
                                                        </div>
                                                    </li>


                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">We believe in your children </a>
                                                        <div class="uk-accordion-content">
                                                            <p>We know the future will require programming abilities. We want to bring 
                                                                our contribution to schools’ efforts in delivering a useful education for
                                                                 the world of tomorrow.</p>
                                                        </div>
                                                    </li>
                                  </ul>
                                  </div>{/*accordion ends here*/}
                         </div>
                      </div>

                      <div className="uk-width-1-2@s uk-margin-medium-top">
                         <div>  <div className="accordionContainer uk-margin-large-top">
                                  <ul uk-accordion="collapsible: false" uk-scrollspy="cls: uk-animation-slide-bottom-medium; repeat: true">
                                                    <li uk-scrollspy="cls: uk-animation-fade4; repeat: true">
                                                        <a class="uk-accordion-title accHeader" href="#">Opportunities for all students, no matter the background</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Our courses build skills for the future and everyone is entitled to access education. That is why we offer
                                                                 scholarships to qualified underprivileged students and create equal chances for all.</p>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Selection of courses that teach in-demand tech skills</a>
                                                        <div class="uk-accordion-content">
                                                            <p>We chose courses that are proven to build students’ skills for tomorrow. Classes with projects that cover programming like Python, 
                                                                robotics and drone engineering, 3D printing or game design and video animation.</p>
                                                        </div>
                                                    </li>
                                               

                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">Top Tech Experts guide through the world of tech</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Qualified teachers selected from top tech universities make sure knowledge
                                                                 is built at the right pace and made easy for all to understand.
                                                      </p>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">You can bring us to your Location</a>
                                                        <div class="uk-accordion-content">
                                                            <p>Besides existing collaborators, CyberTeck Academy teams up with more: Private Schools, Churches,
                                                                 Home School Groups, Sport Leagues or Parks & Rec Centers to meet your needs. Recommend us and we’ll make it happen.</p>
                                                        </div>
                                                    </li>


                                                    <li>
                                                        <a class="uk-accordion-title accHeader" href="#">We believe in your children </a>
                                                        <div class="uk-accordion-content">
                                                            <p>We know the future will require programming abilities. We want to bring 
                                                                our contribution to schools’ efforts in delivering a useful education for
                                                                 the world of tomorrow.</p>
                                                        </div>
                                                    </li>
                                  </ul>
                                  </div>{/*accordion ends here*/}</div>
                      </div>
                </div>
          </div>


          <section className="blue uk-padding uk-margin-medium-top">
                    <div className="uk-container">
                         <div className=" uk-grid" data-uk-grid>
                                <div className="uk-width-1-2@s uk-margin-small-top">
                                     <h2 className="light uk-text-bold">Want quick answers to questions?</h2>
                                </div>

                                <div className="uk-width-1-2@s ">
                                <div class="uk-flex  uk-margin-small-top">
                                   <Link to="/#"><div class="btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Visit FAQ Page</div> </Link>
                                    <Link to='/#'> <div class=" uk-flex-left@s btn-ghost uk-text-center uk-margin-left" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">Our Courses</div></Link>
                               </div>
                                </div>
                         </div>
                    </div>
          </section>




 





        </Layout>
    );
}
