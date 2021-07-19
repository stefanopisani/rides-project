require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const passport     = require('passport');
const cors         = require('cors');

//Include passport configuration
require('./configs/passport');

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// allows heroku to receive connection from other websites
app.set('trust proxy', 1); 

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie:{
    sameSite: "none", //true // the client is on the same domain as the server
    secure:  true, //false, // not using https
    httpOnly: false, //true, // not using https
    maxAge: 600000 // expiration time in ms --> 1 hour
  },
  rolling: true // session gets refreshed with interactions
  // store: new MongoStore({
  //   mongooseConnection: mongoose.connection,
  //   uri: process.env.MONGODB_URI ,
  //   collection:'mySessions',
  //   ttl: 86400 // mins = 24hrs
  // })
}))

//Initialize passport
app.use(passport.initialize());
//Connect passport to the session
app.use(passport.session());

// default value for title local
app.locals.title = 'Rides';

app.use(
  cors({
    credentials:true,
    origin: [process.env.CLIENT_HOSTNAME, "https://rides-io.com"]
})
);

const index = require('./routes/index');
app.use('/', index);

const rides = require('./routes/ride-routes');
app.use('/api', rides);

const auth = require('./routes/auth-routes');
app.use('/api', auth);

module.exports = app;