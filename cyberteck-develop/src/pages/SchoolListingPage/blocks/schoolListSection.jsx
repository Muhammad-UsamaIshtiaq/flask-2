import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Paper, Box, Grid } from '@material-ui/core';
import { PrimaryButton } from '../../../features/Atoms';
import {Link} from 'react-router-dom';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        style: { ...{ margin: '0 5px', borderTopRightRadius: '20px',borderTopLeftRadius: '20px',backgroundColor: '#73d56e', color: 'white', minWidth: '33%', padding: 20, fontSize: 14, fontWeight: 600 } }
    };
}



export default function SimpleTabs(props) {
    // const [value, setValue] = React.useState((props?.showDefault === 0 ? 0: -1));
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        if(value === newValue){
            setValue(-1);
            return;
        }
        setValue(newValue);
    };

    const setInactive = () => {
        // WILL BE IN USE
        setValue(-1);
    }

    const schoolList = props?.schoolListingData[0];
    const tabData = [];
    const tabBody = [];

    for (let i = 0; i < schoolList.length; i++) {
        const schoolKey = Object.keys(schoolList[i])[0];
        const schoolListSegment = schoolList[i][schoolKey];
        tabData.push(
            <Tab key={i} label={schoolKey} {...a11yProps(i)} />
        )
        tabBody.push(<TabPanel style={{ backgroundColor: '#f2f2f2', color: 'black', margin: '10px 0' }} value={value} index={i}><SchoolListSegment row={schoolListSegment} /></TabPanel>)
    }

    return (
        <>
            <Grid item xs={12} style={{ backgroundColor: 'transparent', margin: '10px 0' }}>
                <Tabs style={{ textAlign: 'center' }} value={value} onChange={handleChange} indicatorColor="primary" className="schoolList" >
                    {
                        tabData
                    }
                </Tabs>
            </Grid>
            {tabBody}
        </>
    );
}


const SchoolListSegment = props => {
    return <Grid container spacing={4}>
        {
            props.row.map((col, index) => <Grid item sm={4}>
                {
                    col.map(item => <Grid item xs={12} style={{ padding: 10, textAlign:'left' }}>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs={item.id ? 6 : 12 }>
                                { item.name }
                            </Grid>
                            {
                                item.id && <Grid item xs={6}>
                                        <Link className="defaultLink" to={`/schools/${item.id}/${item.name}`}><PrimaryButton>View Schedule</PrimaryButton></Link>
                                    </Grid>
                            }
                        </Grid>
                    </Grid>)
                }
            </Grid>)
        }
    </Grid>
}