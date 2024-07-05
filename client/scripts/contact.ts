
namespace core {
    export class Contact {

        /**
         *Declaring the instance variables !
         */
        private firstName: string;
        private lastName : string;
        private email :string;
        private reasonForContact:string;
        private city : string;
        private zip :string;


        /**
         * Declaring the constructor for the Contact Class which takes
         * Following arguments and create an Object of the Contact Class
         * @param firstName
         * @param lastName
         * @param email
         * @param reasonForContact
         * @param city
         * @param zip
         */
        constructor(firstName:string = "", lastName: string = "",
                    email:string = "", reasonForContact: string = "",
                    city: string = "", zip: string = "")
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.reasonForContact = reasonForContact;
            this.city = city;
            this.zip = zip;
        }

        /**
         * Generating the Getter and Setter Methods
         */
        public get getFirstName(): string
        {
            return this.firstName;
        }

        set setFirstName(value: string)
        {
            this.firstName = value;
        }

        get getLastName() : string
        {
            return this.lastName;
        }

        set setLastName(value: string)
        {
            this.lastName = value;
        }

        get getEmail() :string
        {
            return this.email;
        }

        set setEmail(value: string)
        {
            this.email = value;
        }

        get getReasonForContact(): string
        {
            return this.reasonForContact;
        }

        set getReasonForContact(value: string)
        {
            this.reasonForContact = value;
        }

        get getCity() : string
        {
            return this.city;
        }

        set setCity(value: string)
        {
            this.city = value;
        }

        get getZip(): string
        {
            return this.zip;
        }

        set setZip(value: string)
        {
            this.zip = value;
        }
    }
}