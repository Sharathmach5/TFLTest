// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
const create = (baseURL = 'https://api.tfl.gov.uk/') => {
  //-----
  //STEP 0
  //-----
  //
  //Prepare the TFL subscription app id and app key
  const tflKeys = {
    app_id:'projectj',
    app_key:'3dd2260d43cc4f72bf24377a21194aa9'
  }

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {},
    // 10 second timeout...
    timeout: 10000,
  });


  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  //
  const getBikePoints = () => api.get('bikepoint/', tflKeys);

  const getLines = () => api.get('line/mode/tube,overground,dlr,tflrail,tram/status/', tflKeys);

  const getAirQuality = () => api.get('AirQuality/');
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  It is just the list of all the
  // methods in step 2.
  //
  // we're not returning back the `api` created in step 1... That's
  // because it is scoped privately.
  //
  return {
    getBikePoints,
    getLines,
    getAirQuality,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
