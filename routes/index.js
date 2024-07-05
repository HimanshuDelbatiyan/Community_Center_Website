"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const contacts_1 = __importDefault(require("../models/contacts"));
const events_1 = __importDefault(require("../models/events"));
const passport_1 = __importDefault(require("passport"));
const util_1 = require("../util");
const router = express_1.default.Router();
router.get("/", function (req, res, next) {
    res.render("index", { pageTitle: "Home", page: "home", LoggedIn: (0, util_1.LoginChecker)(req) });
});
router.get("/home", function (req, res, next) {
    res.render("index", { pageTitle: "Home", page: "home", LoggedIn: (0, util_1.LoginChecker)(req) });
});
router.get("/blogs", function (req, res, next) {
    res.render("index", { pageTitle: "Blogs", page: "blogs", LoggedIn: (0, util_1.LoginChecker)(req) });
});
router.get("/contact", function (req, res, next) {
    res.render("index", { pageTitle: "Contact Us", page: "contact", LoggedIn: (0, util_1.LoginChecker)(req), showModal: false });
});
router.post("/contact", function (req, res, next) {
    let newContact = new contacts_1.default({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "contactReason": req.body.subject,
        "city": req.body.city,
        "zip": req.body.zip
    });
    contacts_1.default.create(newContact).
        then(function () {
        console.log("New Contact Added");
        res.render("index", { pageTitle: "Contact Us", page: "contact", LoggedIn: (0, util_1.LoginChecker)(req), showModal: true, contactData: newContact });
    }).catch(function () { console.log("Some Error Occurred"); next(); });
});
router.get("/events", function (req, res, next) {
    res.render("index", { pageTitle: "Events Planning", page: "events", LoggedIn: (0, util_1.LoginChecker)(req) });
});
router.get("/gallery", function (req, res, next) {
    res.render("index", { pageTitle: "Gallery", page: "gallery", LoggedIn: (0, util_1.LoginChecker)(req) });
});
router.post("/login", function (req, res, next) {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.log("Error:" + info.message);
            res.end();
        }
        if (!user) {
            req.flash("messages", "Warning: Wrong Email or Password");
            console.log(info.message);
            return res.redirect("/login");
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/statistics");
        });
    })(req, res, next);
});
router.get("/logout", function (req, res, next) {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
        }
        console.log("Logout Successfully");
        res.redirect('/login');
    });
});
router.get("/login", function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/planning");
    }
    else {
        res.render("index", { pageTitle: "Login", page: "login", messages: req.flash("messages"), LoggedIn: (0, util_1.LoginChecker)(req) });
    }
});
router.get("/planning", function (req, res, next) {
    if (!req.user) {
        res.redirect("/login");
    }
    else {
        events_1.default.find().then((data) => {
            return data;
        }).then((data) => {
            user_1.default.findById(req.user._id).then(function (userData) {
                res.render("index", { pageTitle: "Events Planning", page: "planning", LoggedIn: (0, util_1.LoginChecker)(req), events: data, markedEvents: userData.markedEvents });
            });
        }).catch((err) => { console.error(err); });
    }
});
router.post("/planning", function (req, res, next) {
    let proposedEvent = new events_1.default({
        "event_name": req.body.eventName_propose,
        "date": req.body.eventDate_propose,
        "description": req.body.eventDescription_propose,
        "address": req.body.eventAddress_propose
    });
    events_1.default.create(proposedEvent).then(() => {
        console.log("New Event has been added");
        res.redirect("/planning");
    }).catch((err) => { console.log(err); });
});
router.get("/planning/:eventID", function (req, res, next) {
    let eventId = req.params.eventID;
    let userId = req.user._id;
    events_1.default.findById(eventId.substring(1))
        .then((eventData) => {
        const updateDoc = {
            $push: {
                "markedEvents": eventData
            }
        };
        return user_1.default.updateOne({ _id: userId }, updateDoc);
    }).then(() => {
        res.redirect("/planning");
    })
        .catch((err) => { console.error(err); });
});
router.get("/planning/delete/:eventID", function (req, res, next) {
    let eventId = req.params.eventID.substring(1);
    let userId = req.user._id;
    user_1.default.updateOne({ "_id": userId }, { $pull: { "markedEvents": { "_id": eventId } } }).then((err) => {
        if (err) {
            console.log(err);
        }
        console.log("Event Removed Successfully from Marked Events");
        res.redirect("/planning");
    }).catch((err) => { console.error(err); });
});
router.get("/portfolio", function (req, res, next) {
    res.render("index", { pageTitle: "Portfolio", page: "portfolio", LoggedIn: (0, util_1.LoginChecker)(req) });
});
router.get("/register", function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/home");
    }
    else {
        res.render("index", { pageTitle: "Register Now", page: "register", messages: req.flash("registerMessage"), LoggedIn: (0, util_1.LoginChecker)(req), showModal: false, });
    }
});
router.post("/register", function (req, res, next) {
    let newUser = new user_1.default({
        "firstName": req.body.firstName_register,
        "lastName": req.body.lastName_register,
        "email": req.body.email,
        "phone": req.body.phone_register,
        "address": req.body.address_register
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            if (err.name === "UserExistsError") {
                console.log("Error:User Already Exists with this email");
                req.flash("registerMessage", "Warning: User already exists");
                res.redirect("/register");
            }
            else {
                req.flash("registerMessage", "Server Error");
                res.redirect("/register");
            }
        }
        else {
            console.log("New User Added");
            return passport_1.default.authenticate("local")(req, res, () => {
                res.render("index", {
                    pageTitle: "Register Now",
                    page: "register",
                    messages: req.flash("registerMessage"),
                    LoggedIn: (0, util_1.LoginChecker)(req),
                    userData: newUser,
                    showModal: true
                });
            });
        }
    });
});
router.get("/services", function (req, res, next) {
    res.render("index", { pageTitle: "Services", page: "services", LoggedIn: (0, util_1.LoginChecker)(req) });
});
router.get("/statistics", function (req, res, next) {
    if (!req.user) {
        res.redirect("/login");
    }
    else {
        res.render("index", { pageTitle: "Statistics", page: "statistics", LoggedIn: (0, util_1.LoginChecker)(req) });
    }
});
router.get("/team", function (req, res, next) {
    res.render("index", { pageTitle: "Team", page: "team", LoggedIn: (0, util_1.LoginChecker)(req) });
});
router.get("/terms", function (req, res, next) {
    res.render("index", { pageTitle: "Terms", page: "terms", LoggedIn: (0, util_1.LoginChecker)(req) });
});
router.get("/edit", function (req, res, next) {
    if (req.isAuthenticated()) {
        let userID = req.user._id;
        user_1.default.findById(userID).then((userInfo) => {
            res.render("index", { pageTitle: "Edit Contact", page: "edit", LoggedIn: (0, util_1.LoginChecker)(req), userData: userInfo, showModal: false });
        });
    }
    else {
        res.redirect("/home");
    }
});
router.post("/edit", function (req, res, next) {
    let userID = req.user._id;
    let updatedUser = new user_1.default({
        "_id": userID,
        "firstName": req.body.firstName_update,
        "lastName": req.body.lastName_update,
        "email": req.body.email_update,
        "password": req.body.password_update,
        "phone": req.body.phone_update,
        "address": req.body.address_update
    });
    user_1.default.findByIdAndUpdate({ _id: userID }, updatedUser).
        then(function () {
        console.log("Information has been updated successfully");
        res.render("index", { pageTitle: "Edit Contact", page: "edit", LoggedIn: (0, util_1.LoginChecker)(req), userData: updatedUser, showModal: true });
    }).catch(function () { console.log("Some Error Occurred"); next(); });
});
exports.default = router;
//# sourceMappingURL=index.js.map