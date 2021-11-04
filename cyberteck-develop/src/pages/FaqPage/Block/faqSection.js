import {
  Grid,
  InputBase,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { BodyText, SecondaryText } from "../../../features/Atoms";
export default (props) => {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <img src="https://i.imgur.com/kdO6YSi.png" width="80" />
        }
        title={<h3 style={{ textAlign: "left", margin: 0, padding: 2 }}>{props?.data?.title}</h3>}
        subheader={<p style={{ textAlign: "left", margin: 0, padding: 2 }}>{props?.data?.subtitle}</p>}
      />
      <CardContent>
        <hr style={{ width: '90%', backgroundColor: 'lightgray', border: 0, height: 1 }} />
        {props?.data?.faqSegment?.map((data) => (
          <QuestionBlock data={data} />
        ))}
      </CardContent>
    </Card>
  );
};


export const QuestionBlock = (props) => (
  <Accordion style={{ margin: '15px 0', backgroundColor: '#72D46F', color: 'white', borderRadius: 5 }}>
    <AccordionSummary
      expandIcon={<AddCircleIcon style={{ color: 'white' }} />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>{props.data.question}</Typography>
    </AccordionSummary>
    <AccordionDetails style={{ backgroundColor: 'white', color: 'black' }}>
      <BodyText>
        {props.data.answer}
      </BodyText>
    </AccordionDetails>
  </Accordion>
);