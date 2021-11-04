import staff from './../../../images/staff.PNG';
import courseImg from './../../../images/course1.JPG';
import Api from './../../../Api';
import { Box, Grid, Link, Paper, Typography, Hidden, Container, Divider } from "@material-ui/core";
import {
    PrimaryButton, PrimaryText,
    CourseBlock,SecondaryText
} from "./../../../features/Atoms"
import useFetch from 'react-fetch-hook';
import Data from './../../../Data';
export default () => {
    const { isLoading, error, data } = useFetch(Api.School.loadAtSchoolCourses());

    if (isLoading) {
        return <h1 style={{ textAlign: 'center' }}>Loading</h1>
    }
    const courseList = data.data
    return (
        <div className="uk-container uk-margin-large-top ">
                     <div>
                       <h1 className="header1 withPaddingLarge uk-text-center">CyberTeck Academy’s top choice for Schools and Parks & Rec Centers</h1>
                           <p className="subText uk-text-center">Tech expertise put into the service of Education</p>
                          

                           <div className="uk-margin-large-top">
                           <ul class=" uk-subnav uk-subnav-pill" uk-switcher="animation: uk-animation-fade">
                                                <li ><a href="#" className="activeTabBtn">All Courses</a></li>
                                                <li><a href="#" className="InactiveTabBtn">Coding Courses</a></li>
                                                <li><a href="#" className="InactiveTabBtn">Game Dev Courses</a></li>
                             </ul>

                                       
                                        <ul class="uk-switcher uk-margin">

                                 {/*First Tab All courses*/}
                                 <li>
                                            <Grid container direction="row"  spacing={2} style={{ marginTop: 20 }}>
                                                {
                                    courseList?.map(item => <Grid item xs={12} md={4} lg={4} style={{ textAlign: 'center' }}>
                                        <CourseBlock
                                            to={`/courses/${item.id}/${item.title.replaceAll(' ', '-')}`}
                                            label={item.title}
                                            grade={Data.Config.get(Data.Config.Grade, item.grade, 'displayName')}
                                            courseType={Data.Config.get(Data.Config.CourseType, item.courseType, 'displayName')}
                                            price={item.price}
                                            mrpPrice={item.mrpPrice}
                                            coverPic={item.coverImage ? Api.Media.getThumb(item.coverImage): null}
                                        />
                                    </Grid>)
                                }
                            </Grid>    
                                            </li>




                                              {/*Second Tab to display Coding courses*/}
                                            <li>Hello again!, this tab is for coding courses</li>






                                            {/*Third Tab to display Game Dev courses*/}
                                            <li>You there!!, this tab is for Game Dev courses!</li>
                                        </ul>
                                        </div>

      


                                     <div className="uk-margin-large-top uk-margin-large-bottom">
                                          <h3 className="header1 uk-text-center">In-Person</h3>
                                          <p className="uk-text-center withPaddingLarge"> To reach everyone’s needs, our Computer Courses will be
                                             available with a live instructor. We make sure our teachers are
                                              present at your location, both for In-Person courses and for Virtual settings.</p>
                                              <div class="uk-flex uk-flex-center  ">
                        <div class="btn uk-text-center " uk-scrollspy="cls: uk-animation-slide-left; repeat: true">Virtual Courses</div>
                        
                      </div>
                                     </div>


                     </div>
        </div>
    )
}


