import BlogList from "./Block/blogList";
import Layout from "../Layout";
import {
  HeaderBox,
  PrimaryText,
  PageBlock,
  PrimaryButton,
  HeaderTitle,
  HeaderDescription,
} from "./../../features/Atoms";
import { Grid, Hidden } from "@material-ui/core";
import { loadAllBlog } from "./../../DataStore/BlogReducer";
import blogcoverImg from "./../../images/blog_banner.png";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import BlogSegment from "./Block/blogSegment";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { useAuthorize } from "./../../features/Authentication/Authorize";

const BlogListPage = (props) => {
  const [mounted, setMounted] = useState(false);
  const isTeacher = useAuthorize("TEACHER");
  const { search } = useLocation();
  const history = useHistory();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const updateScreenSize = () => {
    setScreenSize(window.innerWidth);
  };
  useEffect(() => {
    setMounted(true);
    props.loadAllBlog(search.substring(1, search.length));
    window.addEventListener("resize",updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);
  useEffect(() => {
    if (mounted) {
      props.loadAllBlog(search.substring(1, search.length));
    }
  }, [search]);
  const handleSearch = (type, query) => {
    switch (type) {
      case "category":
        props.loadAllBlog(`category=${query}`);
        break;
      case "search":
        props.loadAllBlog(`q=${query}`);
        break;
      case "direct":
        history.push(`/blog/view/${query}`);
        break;
    }
  };
  return (
    <Layout>
      {
        <HeaderBox
          style={{ paddingTop: screenSize < 700 ? "80%" : "35%" }}
          fullWidth
          coverPic={blogcoverImg}
        >
          <HeaderTitle style={{ textAlign: "center"}}>
            <PrimaryText>
              Welcome to our resource center
            </PrimaryText>
          </HeaderTitle>
          <HeaderDescription style={{ textAlign: "left" }}>
            <Grid container>
              {isTeacher ? (
                <Grid item xs={12}>
                  <PrimaryText
                    style={{
                      paddingLeft: 35,
                      marginBottom: 20,
                    }}
                  >
                    <Link className="defaultLink" to={`/blog/create`}>
                      <PrimaryButton>
                        <AddIcon /> Create New Blog
                      </PrimaryButton>
                    </Link>
                  </PrimaryText>
                </Grid>
              ) : null}
            </Grid>
          </HeaderDescription>
        </HeaderBox>
      }
      {
        <Backdrop
          style={{ zIndex: "1000" }}
          open={props?.loadAllBlogData?.status === "PENDING"}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      <PageBlock maxWidth="lg">
        <Grid container>
          <Grid item sm={8} order={{ sm: 2, xs: 2, lg: 1 }}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  {props.loadAllBlogData && (
                    <BlogList blogList={props?.loadAllBlogData?.data?.posts} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sm={4}
            style={{ marginTop: 25 }}
            order={{ sm: 1, xs: 1, lg: 1 }}
          >
            <BlogSegment
              handleSearch={handleSearch}
              recentPosts={props?.loadAllBlogData?.data?.recentPosts}
            />
          </Grid>
        </Grid>
      </PageBlock>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    loadAllBlogData: state?.blog?.loadAllBlog,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadAllBlog: (params) => dispatch(loadAllBlog(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogListPage);
