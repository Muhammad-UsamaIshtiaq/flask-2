import { Grid, Hidden } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { Link } from "react-router-dom";
import API from './../../../Api';
export const IconText = (props) => {
  return (
    <div
      style={{
        ...props.style,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {<props.icon style={{ color: props?.color?.[0] ?? "#73D56E" }} />}
      <span
        style={{
          marginLeft: 5,
          color: props?.color?.[1] ?? "#696969",
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        {props.text}
      </span>
    </div>
  );
};

export const BlogItem = (props) => {
  const body = JSON.parse(props.body);
  let bodyText = body?.blocks.map((block) => block.text);
  bodyText = bodyText.join(" ");
  return (
    <Link to={`/blog/view/${props.id}`} className="defaultLink">
      <Grid
        container
        style={{
          border: "1px solid lightgray",
          borderRadius: 5,
          marginTop: 20,
          width: "100%",
        }}
        className="blogItem"
      >
        <Grid item sm={4} style={{ position: "relative" }}>
          <img
            src={API.Media.getImage(props.coverImage)}
            style={{ width: "100%", objectFit: "cover", height: "100%" }}
          />
          <span
            style={{
              fontSize: 16,
              borderRadius: 3,
              padding: 4,
              position: "absolute",
              bottom: 20,
              left: 10,
              backgroundColor: "#73D56E",
              color: "white",
            }}
          >
            {props.category}
          </span>
        </Grid>
        <Grid item sm={8} style={{ position: "relative", width: "100%" }}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            style={{ padding: "10px 20px" }}
          >
            <Grid item xs={12} style={{ textAlign: "left" }}>
              <h3 style={{ padding: 0 }}>{props.title}</h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 400,
                  color: "#696969",
                  width: "100%",
                }}
              >
                {bodyText.length > 100
                  ? bodyText.substring(0, 100) + "..."
                  : bodyText}
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                textAlign: "left",
                position: "absolute",
                bottom: 5,
                width: "90%",
              }}
            >
              <Grid
                container
                style={{ borderTop: "1px solid lightgray", padding: '10px 5px' }}
              >
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item style={{marginRight: '15px'}}>
                      <IconText icon={PersonIcon} text={"admin"} />
                    </Grid>
                    <Grid item xs={6}>
                      <IconText
                        style={{float: 'left'}}
                        icon={DateRangeIcon}
                        text={props?.uploadDate?.split("T")[0]}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
};

export default (props) => {
  return (
    <div style={{ padding: 30, width: "100%" }}>
      {props?.blogList?.map((blog) => (
        <BlogItem
          key={blog.title}
          title={blog.title}
          category={blog.category}
          uploadDate={blog.updated_on}
          id={blog.id}
          body={blog.body}
          coverImage={blog.coverImage}
        />
      ))}
    </div>
  );
};
