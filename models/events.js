"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const eventSchema = new Schema({
    event_name: String,
    date: String,
    description: String,
    address: String
}, {
    collection: "upcomingEvents"
});
const Model = mongoose_1.default.model("Event", eventSchema);
exports.default = Model;
//# sourceMappingURL=events.js.map