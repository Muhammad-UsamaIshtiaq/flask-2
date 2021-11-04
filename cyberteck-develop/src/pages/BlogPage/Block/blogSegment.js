import {
  Grid,
  InputBase,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  CardContent,
} from "@material-ui/core";
import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

import Data from "./../../../Data";
import TodayIcon from "@material-ui/icons/Today";
import { IconText } from "./blogList";
import { Link } from "react-router-dom";
import API from './../../../Api';

export default (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Grid container direction="row">
      <Grid item xs={12} style={{ textAlign: "right", padding: 25 }}>
        <InputBase
          id="standard-name"
          label="Name"
          placeholder="search ..."
          style={{
            width: "100%",
            borderRadius: "30px",
            border: "1px solid lightgray",
            margin: 0,
            paddingLeft: 15,
          }}
          onChange={(event) => setSearchQuery(event.target.value)}
          endAdornment={
            <Button
              style={{
                borderRadius: "50%",
                background: "#73D56E",
                height: "50px",
                width: "50px",
                padding: "30px 0",
              }}
              onClick={() => props.handleSearch("search", searchQuery)}
            >
              <SearchIcon style={{ color: "white" }} />
            </Button>
          }
        />
      </Grid>
      <Grid item xs={12} style={{ textAlign: "left" }}>
        <h3 style={{ marginLeft: 25 }}>Categories</h3>
        <UnderlineBar length={5} />
        <ul className="blogCategories">
          {Object.keys(Data.Config.BlogCategory).map((key) => (
            <li>
              <Button onClick={() => props.handleSearch("category", key)}>
                {Data.Config.BlogCategory[key].displayName}
              </Button>
            </li>
          ))}
        </ul>
      </Grid>
      {props?.recentPosts && (
        <Grid item xs={12} style={{ textAlign: "left" }}>
          <h3 style={{ marginLeft: 25 }}>{props?.text ?? "Recent Posts"}</h3>
          <UnderlineBar length={5} />
          <ul className="blogCategories">
            {props?.recentPosts?.map((post) => (
              <li>
                <Button onClick={() => props.handleSearch("direct", post.id)}>
                  {post.title}
                </Button>
              </li>
            ))}
          </ul>
        </Grid>
      )}
    </Grid>
  );
};

export const UnderlineBar = (props) => {
  return (
    <Grid container style={{ padding: "0 25px" }}>
      <Grid
        item
        xs={props.length}
        style={{
          padding: 1,
          height: 1,
          border: "1px solid #73D56E",
          background: "#73D56E",
        }}
      ></Grid>
      <Grid
        item
        xs={12 - props.length}
        style={{
          padding: 0,
          height: 1,
          marginTop: 1,
          border: "1px solid lightgray",
        }}
      ></Grid>
    </Grid>
  );
};

const RelateBlogItem = (props) => {
  return (
    <Card>
      <CardActionArea>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: 'none', }}
            src={API.Media.getThumb(props.coverImage)}
          />
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              fontSize: 14,
              background: "rgb(115, 213, 110)",
              color: "white",
              padding: 5,
              borderRadius: 5,
            }}
          >
            {props.category}
          </div>
        </div>
        <CardContent>
          <h3 style={{ textAlign: "left", marginBottom: 20 }}>{props?.title?.length > 28 ? `${props?.title?.substring(0,26)}...` : props?.title}</h3>
          <hr
            style={{
              border: 0,
              borderBottom: "1px solid lightgray",
              marginBottom: 10,
            }}
          />
          <IconText icon={TodayIcon} text={props?.publishDate?.split("T")?.[0]} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const RelatedBlogs = (props) => {
  return (
    <Container style={{margin: '20px 0'}}>
      <Grid container style={{margin: '20px 0'}}>
        <Grid item xs={12} md={4}>
          <h3 style={{ textAlign: "left", marginLeft: 25 }}>Related Posts</h3>
          <UnderlineBar length={4} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {props?.relatedPosts?.map((blog) => (
          <Grid item xs={12} sm={6} md={3}>
            <Link to={`/blog/view/${blog.id}`} className="defaultLink">
              <RelateBlogItem
                title={blog.title}
                category={blog.category}
                publishDate={blog.updated_on}
                coverImage={blog.coverImage}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
