
import mongoose from "mongoose";

/**
 * Getting the Schema Class from the package
 */
const  Schema = mongoose.Schema;

/**
 * Defining the Schema for Document or for each record in the collection
 * with their types as well as associating the model with the specific
 * collection in the database
 */
const contactSchema: any = new Schema
(
    {
        firstName:String,
        lastName: String,
        email: String,
        contactReason: String,
        city :String,
        zip: String
    },
    {
        collection: "contacts" // Specifying the Collection
    }
)

/**
 * Defining the model using the Schema for that
 */
const Model:any = mongoose.model("Contact", contactSchema);

/**
 * Exporting the model to be used in another modules.
 */
export default Model;




