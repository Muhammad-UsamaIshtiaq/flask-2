import BlogDetail from "./Block/blogDetail";
import Layout from "../Layout";
import {
  HeaderBox,
  PrimaryText,
  PageBlock,
  HeaderTitle,
  PrimaryButton,
} from "./../../features/Atoms";
import { Grid, InputBase, Button, Hidden } from "@material-ui/core";
import { loadBlog, deleteBlog, clearCreateState } from "./../../DataStore/BlogReducer";
import coverImg from "./../../images/minecraft-animation.jpg";
import { useDispatch, connect } from "react-redux";
import { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import BlogSegment from "./Block/blogSegment";
import PersonIcon from "@material-ui/icons/Person";
import TodayIcon from "@material-ui/icons/Today";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import PinterestIcon from "@material-ui/icons/Pinterest";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconText } from "./Block/blogList";
import EditIcon from "@material-ui/icons/Edit";
import API from "./../../Api";

import { Link, Redirect } from "react-router-dom";
import { useAuthorize } from "./../../features/Authentication/Authorize";

import { RelatedBlogs } from "./Block/blogSegment";

const SocialButtons = (props) => {
  return (
    <Grid item>
      <Button
        size="large"
        style={{ backgroundColor: props?.color?.[0], color: "white" }}
        variant="outlined"
        startIcon={<props.icon />}
      >
        {props.text}
      </Button>
    </Grid>
  );
};

const BlogListPage = (props) => {
  const [mounted, setMounted] = useState(false);
  let { blogId } = useParams();
  const history = useHistory();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [coverImage, setBlogCoverImage] = useState(
    API.Media.getImage(props?.loadBlogData?.data?.coverImg)
  );

  const updateScreenSize = () => {
    setScreenSize(window.innerWidth);
  };
  useEffect(() => {
    setMounted(true);
    props.loadBlog(blogId);
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    props.loadBlog(blogId);
    if(!mounted){
      props.clearCreateState();
    }
  }, [blogId]);

  useEffect(() => {
    setBlogCoverImage(
      API.Media.getImage(props?.loadBlogData?.data?.coverImage)
    );
  }, [props?.loadBlogData?.data]);

  const handleSearch = (type, query) => {
    switch (type) {
      case "category":
        history.push(`/blog?category=${query}`);
        break;
      case "search":
        history.push(`/blog?q=${query}`);
        break;
      case "direct":
        history.push(`/blog/view/${query}`);
        props.loadBlog(query);
        break;
    }
  };
  const isTeacher = useAuthorize("TEACHER");
  const blog = props?.loadBlogData?.data;
  const deleteBlog = () => {
    if (isTeacher) {
      props.deleteBlog(blogId);
    }
  };

  if (props.loadBlogData.status === "REJECTED") {
    history.push("/blog");
  }
  if (props.deleteBlogData.status === "FULFILLED") {
    history.push("/blog");
  }

  return (
    <Layout>
      {
        <HeaderBox
          style={{ paddingTop: screenSize < 700 ? "80%" : "35%" }}
          className="BlogDetailHeader"
          fullWidth
          coverPic={coverImage}
        >
          <Grid container style={{ padding: 20 }}>
            <Grid item xs={12}>
              <HeaderTitle
                style={{
                  textAlign: "left",
                  margin: "20px 0",
                  color: "white",
                }}
              >
                <PrimaryText>{blog?.title}</PrimaryText>
                {isTeacher && (
                  <>
                    <Link className="defaultLink" to={`/blog/edit/${blog?.id}`}>
                      <PrimaryButton size="large">
                        <EditIcon  /> Edit
                      </PrimaryButton>
                    </Link>
                    <PrimaryButton
                      onClick={deleteBlog}
                      style={{ backgroundColor: "#e74c3c", marginLeft: 10}}
                    >
                      <DeleteIcon />
                      Delete
                    </PrimaryButton>
                  </>
                )}
              </HeaderTitle>
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ width: "100%" }} spacing={2}>
                <Grid item>
                  <IconText
                    text={blog?.updated_on?.split("T")[0]}
                    icon={TodayIcon}
                    color={[null, "white"]}
                  />
                </Grid>
                <Grid item>
                  <IconText
                    text={blog?.category?.toLowerCase()}
                    icon={CardMembershipIcon}
                    color={[null, "white"]}
                  />
                </Grid>
                <Grid item>
                  <IconText
                    text={"Admin"}
                    icon={PersonIcon}
                    color={[null, "white"]}
                  />
                </Grid>
                <Grid item>
                  <IconText
                    text={"0"}
                    icon={ChatBubbleOutlineIcon}
                    color={[null, "white"]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} style={{ marginTop: 20 }}>
                <Grid container spacing={1}>
                  <SocialButtons
                    color={["#223559", "#1d2940"]}
                    icon={FacebookIcon}
                    text="SHARE"
                  />
                  <SocialButtons
                    color={["#3498db", "#3498db"]}
                    icon={TwitterIcon}
                    text="TWEET"
                  />
                  <SocialButtons
                    color={["#e74c3c", "#e74c3c"]}
                    icon={PinterestIcon}
                    text="PIN IT"
                  />
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </HeaderBox>
      }
      {
        <Backdrop
          style={{ zIndex: "1000" }}
          open={props?.loadBlogData?.status === "PENDING"}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      <PageBlock maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item sm={8} style={{ marginTop: 25 }}>
            <Grid container>
              <Grid item xs={12}>
                {props.loadBlogData.data && (
                  <BlogDetail blogData={props.loadBlogData?.data} />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={4} style={{ marginTop: 15 }}>
            <BlogSegment
              handleSearch={handleSearch}
              recentPosts={props?.loadBlogData?.relatedPosts}
              text={"Related Blogs"}
            />
          </Grid>
          <Grid item xs={12}>
            {/* related blogs */}
            <RelatedBlogs relatedPosts={props?.loadBlogData?.relatedPosts} />
          </Grid>
        </Grid>
      </PageBlock>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    loadBlogData: state?.blog?.loadBlog,
    deleteBlogData: state?.blog?.deleteBlog
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadBlog: (params) => dispatch(loadBlog(params)),
    deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
    clearCreateState: () => dispatch(clearCreateState())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogListPage);
