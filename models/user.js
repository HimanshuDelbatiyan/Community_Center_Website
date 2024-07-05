"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    phone: String,
    markedEvents: [
        {
            event_name: String,
            date: String,
            description: String,
            address: String
        }
    ]
}, {
    collection: "users"
});
userSchema.plugin(passport_local_mongoose_1.default, { usernameField: "email" });
const Model = mongoose_1.default.model("User", userSchema);
exports.default = Model;
//# sourceMappingURL=user.js.map