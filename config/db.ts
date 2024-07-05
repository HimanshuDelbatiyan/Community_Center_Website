/**
 * Database type Flag Indicator
 * Which will be used to indicate which database instance we want to use
 * if true--> Local
 * false --> Remote
 */
let LOCAL= false;
/**
 * Defining some variables  .
 */
let HostName, URI;
/**
 * If Local Flag is true then
 * connection to locally installed MongoDB will be initialized
 */
if(LOCAL)
{
    /**
     * Specifying the database location
     */
    URI= "mongodb://localhost/afour_database";
    HostName = "localhost";
}
else // Otherwise MongoDB Atlas.
{
    /**
     * Defining the database location
     */
    URI = "mongodb+srv://himanshu:JGagGpOFg8J0jSFK@cluster0.e54edco.mongodb.net/afour_database?retryWrites=true&w=majority"
    HostName = "MongoDB Atlas";
}
/**
 * Export the HostName and URI data for use in other modules.
 */
export {HostName, URI};
