"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        default: null
    },
    companyName: {
        type: String,
        default: null
    },
    longURL: {
        type: String,
        required: true,
        default: null
    },
    shortUrl: {
        type: String,
        required: true,
        default: null
    },
    companyID: {
        type: String,
        required: true,
        default: null
    },
    typeURL: {
        type: String,
        required: true,
        default: null
    },
    fieldURL: {
        type: String,
        default: null
    },
    parameters: {
        type: Object,
        default: null
    },
    listID: {
        type: String,
        default: null
    },
    landingID: {
        type: String,
        default: null
    },
    listName: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: new Date()
    }
});
exports.default = mongoose_1.model('URL', eventSchema);
//# sourceMappingURL=url.js.map