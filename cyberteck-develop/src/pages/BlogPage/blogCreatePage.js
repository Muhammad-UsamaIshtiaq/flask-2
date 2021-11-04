import Layout from "../Layout";
import "./blogPage.css";
import { HeaderBox, PageBlock, PrimaryText } from "./../../features/Atoms";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import API from "./../../Api";
import {
  saveBlog,
  loadBlog,
  clearCreateState,
} from "./../../DataStore/BlogReducer";
import CreateEditBlog from "./Block/createEditBlog";
import coverImg from "./../../images/blog_banner.png";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, connect } from "react-redux";
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

const BlogCreatePage = (props) => {
  let params = useParams();
  let dispatch = useDispatch();
  let history = useHistory();
  const [mounted, setMounted] = useState(false);
  const [coverImage, setBlogCoverImage] = useState(
    coverImg
  );
  useEffect(() => {
    console.log("LOG: ", props?.loadBlog?.data?.coverImage)
    if (props?.loadBlog?.data?.coverImage)
      setBlogCoverImage(
        API.Media.getImage(props?.loadBlog?.data?.coverImage)
      );
    else setBlogCoverImage(coverImg)
  }, [props?.loadBlog]);

  useEffect(() => {
    setMounted(true);
    if (!mounted) {
      dispatch(clearCreateState());
    }
  }, []);
  const publish = (values) => {
    if (params.blogId) {
      dispatch(
        saveBlog({
          ...values,
          blogId: params.blogId,
        })
      );
    } else {
      dispatch(saveBlog(values));
    }
  };
  if (!mounted && params.blogId) {
    dispatch(loadBlog(params.blogId));
  }
  if (props.saveBlog.status === "FULFILLED" && props.saveBlog.data) {
    history.push(`/blog/view/${props.saveBlog.data.id}`);
  }
  return (
    <Layout>
      {
        <HeaderBox
          style={{ paddingTop: "35%" }}
          fullWidth
          coverPic={coverImage}
        >
          <PrimaryText
            style={{ textAlign: "center", padding: 35, color: "white" }}
          >
            {params.blogId ? "Edit Blog" : "Create Blog"}
          </PrimaryText>
        </HeaderBox>
      }
      <PageBlock direction="row-reverse">
        <Grid item xs={12} md={9} style={{ margin: 'auto' }}>
          {props.saveBlog.status === "REJECTED" ? (
            <Alert
              severity="error"
              style={{
                position: "fixed",
                top: 65,
                right: 20,
                padding: "3px 9px",
                zIndex: 100,
              }}
            >
              Error Occured
            </Alert>
          ) : null}
          {params.blogId ? (
            props?.loadBlog?.data?.body && (
              <CreateEditBlog publish={publish} content={props?.loadBlog?.data} />
            )
          ) : (
            <CreateEditBlog publish={publish} />
          )}
        </Grid>
      </PageBlock>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    loadBlog: state?.blog?.loadBlog,
    saveBlog: state?.blog?.saveBlog,
  };
};
export default connect(mapStateToProps, null)(BlogCreatePage);
