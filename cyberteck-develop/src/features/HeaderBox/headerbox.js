import { Box, Button, Typography } from "@material-ui/core";
import indexImg from "./../../images/Indexbackground.jpg"
import "./headerbox.css"
import { HeaderTitle, HeaderDescription, PrimaryButton } from "./../Atoms"

export default function HeaderBox(props) {
    return (
        <Box style={{ position: 'relative' }} disableGutters className="headerBox">
            <img src={indexImg} style={{ width: '100%' }} />
            <Box style={{
                position: 'absolute', textAlign: 'left', width: '65%', top: 0, marginTop: '0%'
            }} >
                <HeaderTitle>
                    {props.headerTitle}
                </HeaderTitle>
                <HeaderDescription>
                    {props.headerDescription}
                </HeaderDescription>
                <br />
                {
                    props.headerLink &&
                    <>
                        <PrimaryButton>{props.headerLink.text}</PrimaryButton><br />
                        <Typography className="headerDescription" component="p"
                            style={{ fontSize: '12px', marginLeft: '20px', marginTop: '2px' }}>
                            {props.headerLink.subText}
                        </Typography>
                    </>
                }

            </Box>
        </Box>
    );
}