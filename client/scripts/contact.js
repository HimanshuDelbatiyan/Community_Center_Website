"use strict";
var core;
(function (core) {
    class Contact {
        firstName;
        lastName;
        email;
        reasonForContact;
        city;
        zip;
        constructor(firstName = "", lastName = "", email = "", reasonForContact = "", city = "", zip = "") {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.reasonForContact = reasonForContact;
            this.city = city;
            this.zip = zip;
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
        get getEmail() {
            return this.email;
        }
        set setEmail(value) {
            this.email = value;
        }
        get getReasonForContact() {
            return this.reasonForContact;
        }
        set getReasonForContact(value) {
            this.reasonForContact = value;
        }
        get getCity() {
            return this.city;
        }
        set setCity(value) {
            this.city = value;
        }
        get getZip() {
            return this.zip;
        }
        set setZip(value) {
            this.zip = value;
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map