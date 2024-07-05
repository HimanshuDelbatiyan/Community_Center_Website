namespace  core
{
    /**
     * Creating the User Class !
     */
    export class User
    {
        /**
         * Declaring the instance variables
         */
        private firstName: string;
        private lastName: string;
        private emailAddress: string;
        private password: string;


        /**
         * Defining the Constructor for the user Class !
         * @param emailAddress
         * @param firstName
         * @param lastName
         * @param password
         */
        public constructor(firstName: string = "", lastName: string = "", emailAddress: string = "",
                    password: string = "") {
            /**
             * Populating the instance variables !
             * @type {string}
             * @private
             */
            this.firstName = firstName;
            this.lastName = lastName;
            this.emailAddress = emailAddress;
            this.password = password;
        }

        /**
         * Getter and Setter for each property !
         * @returns {string}
         */
        public get getFirstName(): string {
            return this.firstName;
        }

        public set setFirstName (value: string)
        {
            this.firstName = value;
        }

        public get getLastName(): string {
            return this.lastName;
        }

        public set setLastName(value: string)
        {
            this.lastName = value;
        }

        public get getEmailAddress(): string {
            return this.emailAddress;
        }

        public set setEmailAddress(value: string)
        {
            this.emailAddress = value;
        }

        public get getPassword()
        {
            return this.password;
        }

        public set setPassword(value: string)
        {
            this.password = value;
        }


        /**
         * Defining the String Representation of the Object !
         * @returns {string}
         */
        toString(): string
        {
            return `First Name: ${this.firstName} \n
                Last Name: ${this.lastName} \n  
                Email Address: ${this.emailAddress} \n `;
        }

        /**
         * Creating the Json string Serialize Method !
         * Which return a Whole Object with their own key-value pairs !
         * @returns {{FirstName: string, LastName: string, EmailAddress: string, Password: string}}
         */
        toJSON(): { FirstName: string, LastName: string, EmailAddress: string, Password: string } {
            return {
                FirstName: this.firstName,
                LastName: this.lastName,
                EmailAddress: this.emailAddress,
                Password: this.password
            };
        }

        /**
         * Defining the Json String Deserialize method
         * Which will populate the instance variable with the data it read from json file
         * @param data
         */
        fromJSON(data: { "FirstName": string, "LastName": string, "EmailAddress": string, "Password": string }): void {
            this.firstName = data.FirstName;
            this.lastName = data.LastName;
            this.emailAddress = data.EmailAddress;
            this.password = data.Password;
        }


        /**
         * Creating the Serialize which
         * @returns {null|string}
         */
        serialize(): string | null {
            /**
             * Some validation
             */
            if (
                this.firstName !== ""
                && this.emailAddress !== ""
                && this.lastName !== ""
                && this.password !== "") {
                /**
                 * Return the Json String Representation
                 */
                return `${this.firstName}, ${this.lastName},${this.emailAddress},${this.password}`;
            }
            console.error("Failed to Serialize: One or More Attributes are missing");
            return null;
        }

        /**
         * Populate the data from the json string representation
         * @param data
         */
        deserialize(data: string): void {

            /**
             * Breaking down the passed data on the basis of ","
             * and then storing that in the Array Object
             */
            let propertyArray = data.split(",");
            /**
             * Populating the variables
             * @private
             */
            this.firstName = propertyArray[0];
            this.lastName = propertyArray[1];
            this.emailAddress = propertyArray[2];
            this.password = propertyArray[3];

        }
    }
}