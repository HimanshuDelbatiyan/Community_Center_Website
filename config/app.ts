import createError from 'http-errors';
import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose'; // Importing the package to interact with MongoDB Database.
import passport from "passport" // Importing the Passport Package
import localPassport from 'passport-local'; // Importing the LocalStrategy Authentication Module
import session from 'express-session'; // Importing the Session Management Package for Express Application
import flash from 'connect-flash'; // Importing the flash package to manage the flash Messaging.
import User from "../models/user"; // Importing the Contact Model to communicate with user's collection.



/**
 * Importing the routes from the "routes" file.
 * or
 * Importing the router instance which has grouped related URLs together.
 */
import indexRouter from '../routes';

/**
 * Creating the instance of the Express Application
 */
const app = express();
/**
 * Importing the Database Configuration or Database Detail from the "db file".
 */
import * as DBConfig from './db';
/**
 * Using the mongoose .connect() to MongoDB database
 */
mongoose.connect(DBConfig.URI);

/**
 * Once connection is initialized we can then access the "Connection Object"
 * and then can listen for various events it emits.
 */
const db = mongoose.connection;

/**
 * If the database connection encounters an error
 * it will trigger the error event handler.
 */
db.on('error', function() {
  console.error("Connection Error")
});

/**
 * If the database connection encounters an open event
 * it will trigger the OPEN event handler.
 */
db.once("open", function()
{
  // lOG THIS TEXT INTO THE CONSOLE.
  console.log(`Connected to MongoDB at ${DBConfig.HostName}`)
});

/**
 * Setting the views folder from where the application will get its EJS Template and compile
 * them using view engine
 */
app.set('views', path.join(__dirname, '../views'));
/**
 * Setting the View Engine to Emitted JavaScript
 * Which will compile the .ejs file into the HTML
 */
app.set('view engine', 'ejs');

app.use(logger('dev'));
/**
 * Defining the express application to parse the Request Data to json.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/**
 * Setting the folders static path
 * so we don't to write "absolute path"
 */
app.use(express.static(path.join(__dirname, "../client")));        // server static files from client directory
app.use(express.static(path.join(__dirname, "../node_modules")));  // serve static files from node_modules directory

// Configuring the Express to use "Flash" for managing the flash messaging.
app.use(flash());

// Configuring the Express Application to use Express-Session Management Package.
// as well as defining the secret and some options
app.use(session({
    secret : "JJ00179S",
    resave : false,
    saveUninitialized: false
}));

// Initializing the Passport to be used in Express Application.
app.use(passport.initialize());

// Configuring the Passport to use or allow access to  the Session For Serializing and Deserialize.
app.use(passport.session());

// Getting the LocalStrategy Class from the passport-local Package
const localStrategy = localPassport.Strategy;

// Defining the Strategy to be used within Passport for Authentication
// By passing the object of strategy with configurations
// for now we are using the Mongoose for authentication of user entered data against the one stored in the database
// Note: Hashing of user entered password is automatically done by Mongoose
passport.use(new localStrategy(
    {
        // Specifying the field from where the passport will get its data
        // Note: "Value should be name attribute of the field"
        usernameField: "email",
    },
    User.authenticate()
))

// Defining the Serialization Method for the Passport
// Called On Successful login by the Passport.js
passport.serializeUser(User.serializeUser()) // serializeUser() determine which field of the user document should be serialized

// Defining the Deserialization Method for Passport.
// Called Within Different route handler function to access the Authenticated User Information.
passport.deserializeUser(User.deserializeUser()) // Retrieves the whole user object from the database and attach the user object to the req.

/**
 * Defining the middleware functions
 * Which will be executed for each request
 *
 *  But, we are mounting the "Specific Router instance to a URL"
 *  and when a request to that URL is received then the "Router Handler functions"
 *  inside the specific router instances will execute
 *
 *  But if none of the router handler functions which are again mounted to a specific URL does not execute
 *  or the requested URL does not exists
 *  then the request will be sent to the next middleware
 *  which is an 404 ERROR.
 */
app.use('/', indexRouter);

/**
 * This Middleware function will catch the request and if none of router handler function execute.
 */
app.use(function(req, res, next)
{
  next(createError(404));
});

/**
 * This is an Error Handler Middleware function
 */
app.use
(
    function(err : createError.HttpError, req: express.Request,res : express.Response, next : NextFunction)
    {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    }
);

/**
 * Export the Express Application instance with some defined middleware function to be used in other modules.
 */
export default app;