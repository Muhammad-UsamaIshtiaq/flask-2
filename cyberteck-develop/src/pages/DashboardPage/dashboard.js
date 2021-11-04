import Layout from "../Layout";
import "./dashboard.css";
import { PageBlock, PrimaryText } from "../../features/Atoms";
import { Grid, Paper, Typography, ButtonBase, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuthorize } from "../../features/Authentication/Authorize";
import CourseTableGrid from "../../features/CourseTableGrid";
import SchoolTableGrid from "../../features/SchoolTableGrid";

export default function DashboardPage(props) {
  const isTeacher = useAuthorize('TEACHER');
  const isRepresentative = useAuthorize('REPRESENTATIVE');
  
  return (
    <Layout fillHeader style={{ background: '#f6f7f7' }}>
      <div style={{ paddingTop: "7%" }}> </div>
      <PageBlock style={{ background: '#f6f7f7' }}>
        <Grid item xs={12}>
          <PrimaryText>Your Course List</PrimaryText>
        </Grid>
        <Grid item xs={12}>
          <CourseTableGrid />
        </Grid>
        <Grid item xs={12}>
          <PrimaryText>Your School List</PrimaryText>
        </Grid>
        <Grid item xs={12}>
          <SchoolTableGrid />
        </Grid>
      </PageBlock>
      <div style={{ paddingTop: "25%" }}> </div>
    </Layout>
  );
}

export const DashBoardButton = (props) => (
  <Paper
    {...props}
    elevation={3}
    style={{
      background: props.bgColor,
      color: "white",
      width: "100%",
      borderRadius: 15,
      padding: "10% 5%",
      height: "100%",
    }}
    component={ButtonBase}
  >
    <div style={{ textAlign: "center" }}>
      <Typography className="secondaryTest textPoppins" style={{ margin: 0 }}>
        {props.children}
      </Typography>
    </div>
  </Paper>
);