
// Importing the package to interact with MongoDB
import mongoose from "mongoose";
// Importing the package to provide security and authentication method to mongoose
// Or Package which will integrate the Passport.js into mongoose.
import passportLocalMongoose from 'passport-local-mongoose';

/**
 * Getting the Schema Class from the package
 */
const  Schema = mongoose.Schema;

/**
 * Defining the Schema for Document or for each record in the collection
 * with their types as well as associating the model with the specific
 * collection in the database
 */
const userSchema: any = new Schema
(
    {
        firstName:String,
        lastName: String,
        email: String,
        address: String,
        phone:String,
        markedEvents : [
            {
                event_name: String,
                date : String,
                description: String,
                address : String
            }
        ]
    },
    {
        collection: "users" // Specifying the Collection
    }
)

/**
 * Extending the functionality of Mongoose by plugin the package which will integrate the
 * Passport.js into the Mongoose.
 *
 * as well as specifying the fields based on which the user will be authenticated.
 */
userSchema.plugin(passportLocalMongoose,{usernameField:"email"})

/**
 * Defining the model using the Schema for that
 */
const Model:any = mongoose.model("User", userSchema);

/**
 * Exporting the model to be used in another modules.
 */
export default Model;




