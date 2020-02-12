// Import external dependencies
import Velocity from 'velocity-animate';
import Waypoint from 'waypoints/lib/jquery.waypoints.js';

// Import local dependencies
import Router from './util/Router';
import imageReveals from './util/imageReveals';
import appState from './util/appState';

// Routes
import common from './routes/common';
import home from './routes/home';

// Populate Router instance with DOM routes
const routes = new Router({
  common,
  home
});

// Inits
imageReveals.init();
appState.init();

// Load events
$(document).ready(() => routes.loadEvents());