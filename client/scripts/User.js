"use strict";
var core;
(function (core) {
    class User {
        firstName;
        lastName;
        emailAddress;
        password;
        constructor(firstName = "", lastName = "", emailAddress = "", password = "") {
            this.firstName = firstName;
            this.lastName = lastName;
            this.emailAddress = emailAddress;
            this.password = password;
        }
        get getFirstName() {
            return this.firstName;
        }
        set setFirstName(value) {
            this.firstName = value;
        }
        get getLastName() {
            return this.lastName;
        }
        set setLastName(value) {
            this.lastName = value;
        }
        get getEmailAddress() {
            return this.emailAddress;
        }
        set setEmailAddress(value) {
            this.emailAddress = value;
        }
        get getPassword() {
            return this.password;
        }
        set setPassword(value) {
            this.password = value;
        }
        toString() {
            return `First Name: ${this.firstName} \n
                Last Name: ${this.lastName} \n  
                Email Address: ${this.emailAddress} \n `;
        }
        toJSON() {
            return {
                FirstName: this.firstName,
                LastName: this.lastName,
                EmailAddress: this.emailAddress,
                Password: this.password
            };
        }
        fromJSON(data) {
            this.firstName = data.FirstName;
            this.lastName = data.LastName;
            this.emailAddress = data.EmailAddress;
            this.password = data.Password;
        }
        serialize() {
            if (this.firstName !== ""
                && this.emailAddress !== ""
                && this.lastName !== ""
                && this.password !== "") {
                return `${this.firstName}, ${this.lastName},${this.emailAddress},${this.password}`;
            }
            console.error("Failed to Serialize: One or More Attributes are missing");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.firstName = propertyArray[0];
            this.lastName = propertyArray[1];
            this.emailAddress = propertyArray[2];
            this.password = propertyArray[3];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=User.js.map