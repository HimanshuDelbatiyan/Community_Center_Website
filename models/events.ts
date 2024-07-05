
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
const eventSchema: any = new Schema
(
    {
        event_name: String,
        date: String,
        description: String,
        address: String
    },
    {
        collection: "upcomingEvents" // Specifying the Collection
    }
)

/**
 * Defining the model using the Schema for that
 */
const Model:any = mongoose.model("Event", eventSchema);

/**
 * Exporting the model to be used in another modules.
 */
export default Model;




