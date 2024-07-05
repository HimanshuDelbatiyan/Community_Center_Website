"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URI = exports.HostName = void 0;
let LOCAL = false;
let HostName, URI;
if (LOCAL) {
    exports.URI = URI = "mongodb://localhost/afour_database";
    exports.HostName = HostName = "localhost";
}
else {
    exports.URI = URI = "mongodb+srv://himanshu:JGagGpOFg8J0jSFK@cluster0.e54edco.mongodb.net/afour_database?retryWrites=true&w=majority";
    exports.HostName = HostName = "MongoDB Atlas";
}
//# sourceMappingURL=db.js.map