import React, { useState, useEffect } from "react";
import "./App.css";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

/**
 * Material UI
 */
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";

/**
 * Custom components
 */
import LineComponent from "./components/LineComponent";


/**
 * Api
 */
import API from "./utils/api";
import { Palette } from "@material-ui/icons";

/**
 * create function returns a list of {getBikePoints, getLines, getAirQuality}

    you can use these functions below using api.functionname. You can add more functions to api.js file
    to handle new apicalls. Project open for extension.
 */
const api = API.create();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  airqualitygridcontainerroot:{
    backgroundColor:'steelblue', width:'100%', marginTop: '20px', marginLeft: '10px',
    paddingLeft:'30px', paddingRight: '30px', paddingTop: '15px', paddingBottom:'15px',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  container: {
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(1)
  },
  progress: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(-8)
  },
  tabContainer: {
    marginTop: theme.spacing(1)
  },
  gridContainer: {
    marginTop: theme.spacing(8)
  },
  footer: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      marginTop: theme.spacing(2),
      justifyContent: "center"
  }
}));

function App() {
  const classes = useStyles();
  const [fetching, setFetching] = useState(false);
  const [bikePoints, setBikePoints] = useState();
  const [streetName, setStreetName] = useState();
  const [lines, setLines] = useState();
  const [airQuality, setAirQuality] = useState();
  //console.log('inside app' + lines);
  const [errorSnack, setErrorSnack] = useState({
    visible: false,
    content: ""
  });

  /**
   * Tabs state
   */
  const [value, setValue] = useState(0);
  
  function handleChange(event, newValue) {
    switch (newValue) {
      case 0:
        fetchBikePoints();
        break;
      case 1:
        fetchLines();
        break;        
      case 2:
        fetchAirQuality();
        break;
      default:
        break;
    }
    setValue(newValue);
  }

  const styleInfo = {
    paddingRight:'10px'
  }

  const fetchBikePoints = () => {
    setFetching(true);
    api.getBikePoints().then(result => {
      if (result.ok) {
        setBikePoints(result.data);
        console.log(result.data);
        setFetching(false);
      } else {
        setErrorSnack({ visible: true, content: result.problem });
        setFetching(false);
      }
    });
  };

  const fetchLines = () => {
    setFetching(true);
    api.getLines().then(result => {
      if (result.ok) {
        setLines(result.data);
       // console.log(result.data);
        setFetching(false);
      } else {
        setErrorSnack({ visible: true, content: result.problem });
        setFetching(false);
      }
    });
  };

  const fetchAirQuality = () => {
    setFetching(true);
    api.getAirQuality().then(result => {
      if (result.ok) {
        setAirQuality(result.data)
        setFetching(false);
      } else {
        setErrorSnack({ visible: true, content: result.problem });
        setFetching(false);
      }
    });
  }

  

  //below useEffect Hoook is used to call fetchBikePoints() function when the component completes mounting
  //or fetchBikePoints() function is called in componentDidMount() function.
  //here it is called so that bikepoints can load upon first loading the page.
  useEffect(() => {
    fetchBikePoints();
    fetchAirQuality();
  }, []);


  function handleSearch(event){
    console.log(event.target.value);
    setStreetName(event.target.value);
  }
  const renderFilteredBikePoints = () =>
    bikePoints.filter((point)=>point.commonName.includes(streetName)).map((points, _) => (
      <div>
      <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}>
      <ListItem
          dense
          divider
          alignItems="center"
          justify="center"
        >
        <ListItemText primary={points.commonName} />
        <ListItemSecondaryAction key={points.id}>
          <ListItemText
            primary={points.url}
            align="center"
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
    </div>
  ));

  //rendering third tab. it has grid layout with griditems.
  const renderAirQuality = () => (
       <div>
          <Grid container className={classes.airqualitygridcontainerroot} spacing={3} justifyContent="space-between" >
             <Grid item xs={6}>
               <Paper className={classes.paper} elevation={2}>
                  <Typography variant={'h6'} style={{fontWeight:500}}>Forecast: {airQuality.currentForecast[0].forecastType}</Typography>
                </Paper>
             </Grid>
             <Grid item xs={6}>
               <Paper className={classes.paper} elevation={2}>
                  <Typography variant={'h6'} style={{fontWeight:500}}>Forecast: {airQuality.currentForecast[1].forecastType}</Typography>
                </Paper>
             </Grid>

             <Grid item xs={6}>
               <Paper className={classes.paper} elevation={2}>
                  <Typography variant={'body1'} style={{fontWeight:500}}>{airQuality.currentForecast[0].forecastSummary}</Typography>
                 </Paper>
             </Grid>
             <Grid item xs={6}>
               <Paper className={classes.paper} elevation={2}>
                  <Typography variant={'body1'} style={{fontWeight:500}}>{airQuality.currentForecast[1].forecastSummary}</Typography>
                 </Paper>
             </Grid>

             <Grid item xs={6}>
               <Paper className={classes.paper} elevation={2}>
                   <Typography variant={'body2'} style={{fontWeight:500}}><div dangerouslySetInnerHTML={ {__html: airQuality.currentForecast[0].forecastText} }/></Typography>
                 </Paper>
             </Grid>
             <Grid item xs={6}>
               <Paper className={classes.paper} elevation={2}>
                   <Typography variant={'body2'} style={{fontWeight:500}}><div dangerouslySetInnerHTML={ {__html: airQuality.currentForecast[1].forecastText} }/></Typography>
                 </Paper>
             </Grid>
          </Grid>
       </div>
  );

  const onSnackClose = () => setErrorSnack({ visible: false, content: "" });

  return (
    <div className="App">
      {fetching && (
        <LinearProgress
          color="secondary"
          className={classes.progress}
          variant="query"
        />
      )}
      <AppBar position="fixed" style={{backgroundColor: '#002D72'}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Transport for London by Sharath
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.gridContainer} direction="row">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Search Bike points" />
              <Tab label="Line status" />
              <Tab label='Air Quality Index' />
            </Tabs>
            {value === 0 && (
              <div className={classes.tabContainer}>
              <div>
              <input type="text" placeholder="Search by street name"  onChange={handleSearch} />
              {bikePoints && streetName && renderFilteredBikePoints()}
              </div>
              </div>
            )}

            {value === 1 && (
              <div className={classes.tabContainer}>
                <LineComponent
                  title="London underground lines status"
                  lines={lines}
                />
              </div>
            )}

            {
              value === 2 && (
                <div className={classes.tabContainer}>
                  {renderAirQuality()}
                </div>
              )}
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={errorSnack.visible}
        onClose={onSnackClose}
        variant="error"
        TransitionComponent={Fade}
        message={errorSnack.content}
      />
    </div>
  );
}

export default App;
