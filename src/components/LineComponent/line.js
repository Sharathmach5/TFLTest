import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

//Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
//we use lodash in our project to select last and first item in json response array
import _ from 'lodash';

//moment library is used to format date contained in fromDate, toDate property in validityPeriods 
//in lines json response.
import moment from "moment";

/*
//THIS FILE REPRESENTS SINGLE NESTED LIST ITEM COMPONENT.
//RETURNS LIST ITEM AND NESTED ITEM ALONG WITH PREFILLED DATA FROM API REQUEST
//
*/
const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(6)
  }
}));

function Line({ line, onClick, expanded }) {
  const classes = useStyles();
  const latestStatus = _.last(line.lineStatuses);
  //Returns <ListItem > using nested lists example from https://material-ui.com/components/lists/
  return (
    //key attribute should be given to every element of array so that react knows what changes are 
    //happening. here key is line.id
    <div key={line.id}>
      <ListItem button divider alignItems="center"justify="center" onClick={onClick}>
        {expanded ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={line.name} />
        <ListItemSecondaryAction key={latestStatus.id}>
          <ListItemText
            primary={latestStatus.statusSeverityDescription}
            align="center"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {line.lineStatuses.map(status => (
            <ListItem key={status.id} className={classes.nested}>
              <ListItemIcon>
                {status.statusSeverity === 10 ? (<CheckCircleOutlinedIcon />) : (<ReportOutlinedIcon />)}
              </ListItemIcon>
              <ListItemText
                primary={status.statusSeverity !== 10  ? status.reason : status.statusSeverityDescription}
                secondary={`${moment(status.validityPeriods.fromDate).format("DD/MM/YYYY HH:mm")}`}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
}

export default Line;
