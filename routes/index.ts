/**
 * Importing the Express Package
 */
import express from 'express';
/**
 * Importing the Mongoose Models defined in another Modules
 */
import User from "../models/user"; // User Model
import Contact from "../models/contacts";
import Event from "../models/events";
/**
 * Importing the Passport package for user authentication.
 */
import passport from "passport";
/**
 * Importing the user login status Checker function from another module
 */
import {LoginChecker} from "../util";


/**
 * Getting the Router Class from the Express Package to define a Group of related routes.
 * and then we can mount them to a specific URL.
 */
const router = express.Router();

/**
 * =============> Home Page
 */
router.get("/", function(req, res, next)
{
    res.render("index",{pageTitle: "Home",page:"home", LoggedIn : LoginChecker(req)});
})

/**
 * ========> Home Page
 */
router.get("/home", function(req, res, next)
{
    res.render("index",{pageTitle: "Home",page:"home",LoggedIn : LoginChecker(req)});
})

/**
 * ===================> Blogs Page (Method : GET)
 */
router.get("/blogs", function(req, res, next)
{
    res.render("index",{pageTitle: "Blogs",page:"blogs",LoggedIn : LoginChecker(req)});
})

/**
 * ==========================> Contact Page (METHOD =========> "GET")
 */
router.get("/contact", function(req, res, next)
{
    res.render("index",{pageTitle: "Contact Us",page:"contact",LoggedIn : LoginChecker(req),showModal:false});
})


/**
 * ==========================> Contact Page (METHOD =========> "POST")
 */
router.post("/contact", function(req, res, next)
{
    /**
     * Creating the new Document using the Model we have defined in user.ts
     * or
     * Creating the Object of the Model.
     */
    let newContact :any = new Contact(
        {
            "firstName" : req.body.firstName,
            "lastName" : req.body.lastName,
            "email" : req.body.email,
            "contactReason": req.body.subject,
            "city" : req.body.city,
            "zip": req.body.zip
        }
    )

    /**
     * Trying to insert the user into the collection "users"
     * using .create() which will return promise and on successful resolution the user
     * will be redirected to the "loginPage"
     */
    Contact.create(newContact).
    then(function()
        {
            console.log("New Contact Added"); // Message in Console
            res.render("index",{pageTitle: "Contact Us",page:"contact",LoggedIn : LoginChecker(req),showModal:true, contactData:newContact});
        }
    ).catch // Catch the Error if there is any.
    (
        function(){console.log("Some Error Occurred"); next()}
    )
})

/**
 * =======================> Events Page
 */
router.get("/events", function(req, res, next)
{
    res.render("index",{pageTitle: "Events Planning",page:"events",LoggedIn : LoginChecker(req)});
})

/**
 * ===========================> Gallery Page
 */
router.get("/gallery", function(req, res, next)
{
    res.render("index",{pageTitle: "Gallery",page:"gallery",LoggedIn : LoginChecker(req)});
})


// ==============================================================
// ==================== Authentication Routes

/**
 * ==================>  Login Page =======> (METHOD==>"POST")
 */
router.post("/login", function(req, res, next)
{
    /**
     * Executing the Authentication Strategy defined
     * Which will get its input from the fields specified
     * in the Strategy.
     * Which are username and password (named Fields)
     */
    passport.authenticate('local', (err:any, user:any, info:any) =>
    {
        // if any Error Occurred Could be "MongoDB or any" in the strategy we defined.
        if (err)
        {
            // Pass the Request Object to the next middleware
            console.log("Error:" + info.message)
            res.end(); // End the response.
        }
        if (!user) // If no user was found then a message will be sent to the use or authentication fails.
        {
            // Authentication failed
            req.flash("messages","Warning: Wrong Email or Password"); // Message for user Stored in user session.
            console.log(info.message) // Message in Console.
            return res.redirect("/login"); // Redirect the user to "login Page"
        }

        // If no errors any stuff that means Authentication is successful
        //now we need to establish a session with the user.
        // This is done by req.login() Method which create a session as well as session Identifier
        // Once created and associated with the user Serialized method is invoked by passport.js
        // to serialize the passed user object into the user session.
        // and then Callback is executed.
        req.login(user, (err) =>
        {
            if (err) // Any Error pass it the next middleware
            {
                return next(err);
            }
            // Everything Good, Redirect the user.
            return res.redirect("/statistics");
        });

    })(req, res, next); // next method can be called internally that's why it is passed as an argument
})

/**
 * ================>LOGOUT PAGE (METHOD ==> "GET")
 */
router.get("/logout",function(req, res, next)
{
    /**
     * Remove the user session or delete the user session.
     */
    req.logout((err)=>
    {
        if (err) // If any error removing the session
        {
            console.error('Error logging out:', err); // Message in console
        }
        console.log("Logout Successfully");
        res.redirect('/login'); // Redirect to home page
    });
})

/**
 * ============> Login Page ( METHOD ===> "GET")
 */
router.get("/login", function(req, res, next)
{
    if(req.isAuthenticated()) // if the user is already logged in so why coming here
    {
        res.redirect("/planning"); // Redirection
    }
    else // if the user is not logged in or authenticated by the passport.js then he can Access this page.
    {
        res.render("index",{pageTitle: "Login",page:"login",messages: req.flash("messages"),LoggedIn : LoginChecker(req)});
    }
})

/**
 * ======================> Events Planning ==> GET METHOD
 */
router.get("/planning", function(req, res, next)
{

    if(!req.user) // if the user is not authenticated then redirect the user to the login page.
    {
        res.redirect("/login");
    }
    else // if the user is authenticated.
    {
        /**
         * Fetch the events from the database and
         * send it to the planning.ejs to show
         */
        Event.find().then((data:any) =>
        {
            return data; // Will be used in next then.
        }).then((data:any) =>
        {
            // @ts-ignore
            User.findById(req.user._id).then(function(userData)// Fetching the user by using the one stored in session by the Passport.js.
            {
                res.render("index", {pageTitle: "Events Planning", page: "planning", LoggedIn: LoginChecker(req), events: data, markedEvents: userData.markedEvents});
            })
        }).catch((err:any) => {console.error(err)}) // Any error will be logged into the console.
    }
})

/**
 * ======================> Planning Page: - (METHOD ==> "POST)"
 */
router.post("/planning", function(req, res, next)
{
    /**
     * Creating the new Event document or creating the instance of Event Model for the upcomingEvents collection
     */
    let proposedEvent :any = new Event(
    {
        // Populating the documents fields using the data sent with request.
        "event_name" : req.body.eventName_propose,
        "date" : req.body.eventDate_propose,
        "description":  req.body.eventDescription_propose,
        "address":  req.body.eventAddress_propose
    })

    /**
     * Inserting the document into the "upcomingEvents Collection"
     */
    Event.create(proposedEvent).then(() =>
    {
        // if the promise resolution is successful then kof an message into the console
        console.log("New Event has been added");
        res.redirect("/planning"); // Redirection
    }).catch((err:any) => {console.log(err)}) // Cathes error if there is any.
})

/**
 *  =================> Planning Page (METHOD => "GET")
 */
router.get("/planning/:eventID", function(req, res, next)
{
    /**
     * Retrieving the event id from the requested URL.
     */
    let eventId = req.params.eventID;

    // @ts-ignore
    let userId = req.user._id;

    /**
     * Finding the event from the collection
     */
    Event.findById(eventId.substring(1))
        .then((eventData: any) => // Once all the code inside is executed successfully only then the next then executes.
        {
            /**
             * Defining the updated document.
             * Which will push the event into the user marked events array.
             */
            const updateDoc =
            {
                $push:
                {
                    "markedEvents": eventData // Push the event into the marked event array
                }
            };
            // Update the User Document.
            return User.updateOne({ _id: userId }, updateDoc); // return mean next then execution starts.

        }).then(() =>
        {
            res.redirect("/planning"); // Redirection
        })
        .catch((err: any) => {console.error(err);}); // Catches error if there is any.
})

/**
 * ========================> Planning Delete Page (METHOD ===> GET)
 */
router.get("/planning/delete/:eventID", function(req, res, next)
{
    /**
     * Getting the event ID from the requested URL
     */
    let eventId = req.params.eventID.substring(1);

    // @ts-ignore
    let userId = req.user._id;

    /**
     * Trying to Update the user Document.
     * On Request this will remove the specific event from the user markedEvents array.
     */
        User.updateOne
        (
            { "_id": userId },
            { $pull: { "markedEvents": {"_id":eventId}} }
        ).then((err:any) => {
            if(err)
            {
                console.log(err);
            }
            console.log("Event Removed Successfully from Marked Events");
            res.redirect("/planning"); // Redirection
        }).catch((err:any) => {console.error(err);}); // Catches the Error if there is any.

})

/**y
 * ====================> Portfolio Page
 */
router.get("/portfolio", function(req, res, next)
{

    res.render("index",{pageTitle: "Portfolio",page:"portfolio",LoggedIn : LoginChecker(req)});
})

/**
 *  =====================> Register Page (METHOD ======> GET)
 */
router.get("/register", function(req, res, next)
{
    if(req.isAuthenticated()) // if the user is already authenticted or logged in then redirect the user to home.
    {
        res.redirect("/home");
    }
    else // otheriwse show the register page.
    {
        res.render("index",{pageTitle: "Register Now",page:"register",messages: req.flash("registerMessage"),LoggedIn : LoginChecker(req), showModal : false,});
    }
})

/**
 *  =====================> Register Page (METHOD =====> POST)
 */
router.post("/register", function(req, res, next)
{
    /**
     * Creating the new Document using the Model we have defined in user.ts
     * or
     * Creating the Object of the Model.
     */
    let newUser :any = new User(
        {
            "firstName" : req.body.firstName_register,
            "lastName" : req.body.lastName_register,
            "email" : req.body.email,
            "phone": req.body.phone_register,
            "address": req.body.address_register
        }
    )

    /**
     Using the register() method to insert the new user into the database which will encrypt the password as well as
     take care of stuff if the user already exists.
     */
    User.register(newUser, req.body.password,
        (err: any) => // This callback will be executed once the register function is executed.
        {
            if(err) // if there is any during the registration
            {
                if (err.name === "UserExistsError") // User Already exists with that email
                {
                    console.log("Error:User Already Exists with this email") // Log Message into the console.
                    req.flash("registerMessage", "Warning: User already exists") // Flash Message for user
                    res.redirect("/register"); // Redirection
                }
                else
                {
                    req.flash("registerMessage", "Server Error") // For General Error
                    res.redirect("/register"); // Redirection
                }
            }
            else
            {
                console.log("New User Added"); // Message in Console
                return passport.authenticate("local")
                    // These are the arguments for the function returned by the above line of code.
                    (req, res,
                        () => {
                            // Show the register page with Modal
                            res.render("index", {
                                pageTitle: "Register Now",
                                page: "register",
                                messages: req.flash("registerMessage"),
                                LoggedIn: LoginChecker(req),
                                userData: newUser,
                                showModal: true
                            });
                    })
            }
        }
    )
})

/**
 * ========================> Services Page
 */
router.get("/services", function(req, res, next)
{
    res.render("index",{pageTitle: "Services",page:"services",LoggedIn : LoginChecker(req)});
})

/**
 * =====================> Statistics Page
 */
router.get("/statistics", function (req, res, next)
{
    if(!req.user) // redirect the unauthenicated user.
    {
        res.redirect("/login");
    }
    else
    {

        res.render("index", {pageTitle: "Statistics", page: "statistics",LoggedIn : LoginChecker(req)});
    }
})

/**
 * =====================> Team Page
 */
router.get("/team", function(req, res, next)
{
    res.render("index",{pageTitle: "Team",page:"team",LoggedIn : LoginChecker(req)});
})


/**
 * =====================> Terms Page
 */
router.get("/terms", function(req, res, next)
{
    res.render("index",{pageTitle: "Terms",page:"terms",LoggedIn : LoginChecker(req)});
})



/**
 * =====================> Edit Page
 */
router.get("/edit", function(req, res, next)
{
    if(req.isAuthenticated())
    {
        // @ts-ignore
        let userID = req.user._id;

        User.findById(userID).then((userInfo:any)=>
        {
            res.render("index",{pageTitle: "Edit Contact",page:"edit",LoggedIn : LoginChecker(req),userData:userInfo,showModal:false});
        })
    }
    else
    {
        res.redirect("/home");
    }
})

/**
 * =====================> Edit Page
 */
router.post("/edit", function(req, res, next)
{
    // @ts-ignore
    let userID = req.user._id;

    /**
     * Creating the new Document using the Model we have defined in user.ts
     * or
     * Creating the Object of the Model.
     */
    let updatedUser : any = new User(
        {
            "_id": userID,
            "firstName" : req.body.firstName_update,
            "lastName" : req.body.lastName_update,
            "email" : req.body.email_update,
            "password": req.body.password_update,
            "phone": req.body.phone_update,
            "address": req.body.address_update
        }
    )
    /**
     * Finding the document and updating it with the new one.
     */
    User.findByIdAndUpdate({_id:userID},updatedUser).
    then(function()
        {
            /**
             * On Successful resolution user an Modal will be shown to the user.
             */
            console.log("Information has been updated successfully"); // Message in Console
            res.render("index",{pageTitle: "Edit Contact",page:"edit",LoggedIn : LoginChecker(req),userData: updatedUser, showModal:true}); // Redirect the user to Login Page
        }
    ).catch(function(){console.log("Some Error Occurred"); next()}) // Catches error if there is any
})


/**
 * Once done specifying the router handler function for the specific routed
 * then export the router instance to be used in other modules.
 */
export default router;


























