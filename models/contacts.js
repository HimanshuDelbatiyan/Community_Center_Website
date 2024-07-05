"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const contactSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    contactReason: String,
    city: String,
    zip: String
}, {
    collection: "contacts"
});
const Model = mongoose_1.default.model("Contact", contactSchema);
exports.default = Model;
//# sourceMappingURL=contacts.js.map