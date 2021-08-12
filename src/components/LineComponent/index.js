import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import { makeStyles } from '@material-ui/core/styles';
import Line from './line';

/*
//THIS FILE REPRESENTS STATIONSLIST COMPONENT WHICH CONTAINS NESTED LIST WITH PREFILLED DATA.
//LINECOMPONENT COMPONENT IS INCLUDED IN APP.JS. 
//IN THE WEBSITE YOU WILL SEE THIS COMPONENT IN SECOND TAB.
*/

//the flexGrow style attribute specifies how much of remaining space in the container should be assigned
//to the items with flexGrow = 1 attribute. DOM tags with flexGrow = 2 are assigned more space than
//DOM tags with flexGrow = 1.
//more info here: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
//here we assign flexGrow to material ui <List >
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: '15px',
  },
}));

//the lines prop below contains an array of 15 objects representing lines and other fields like statusses.
//the lines prop contains all current info about lines.
function LineComponent({ title, lines }) {
  const [checked, setChecked] = useState([]);
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function renderLines() {
    //map() function allows you to pass a function that applies to every element of the lines array.
    //remember lines contains array of 15objects contained in json response. Basically we're only selecting 
    //the fields in array which we're interested like name, lineStatuses.statusSeverity and lineStatuses.validityPeriods.FromData and ToDate
    //and wrapping them in a nice Line component. this wrapping process is applied to every element in lines
    //array using map function. after wrapping is done the array is then rendered onto screen as component.
    return lines.map((line, _) => (
      <Line
        key={line.id}
        line={line}
        onClick={handleToggle(line.name)}
        expanded={checked.indexOf(line.name) !== -1}
      />
    ));
  }
  //we can make use of makeStyles available in material UI.
  const classes = useStyles();

  //returning MaterialUi list component. use <ListSubHeader > to display subheading on top of list.
  //format: <ListItem button> contains <ListItemIcon> or <ListItemText>.
  //for complete api guide: https://material-ui.com/components/lists/.
  return (
    <List
      component="nav" aria-labelledby="nested-list-subheader"
      subheader={(
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
       )}                   className={classes.root}
    >
      {/*conditional rendering below. In Javascript,  true && expression always evaluates to
       expression, and false && expression always evaluates to false. Here if lines is empty meaning if it is
       equal to undefined(since lines is state variable) then below evaluates to false or
       if lines equals to empty array or array with elements, then evaluates to expression*/}
      { lines && renderLines()}
    </List>
  );
}

export default LineComponent;
