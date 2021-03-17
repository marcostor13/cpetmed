"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    landingid: {
        type: String,
        default: null
    },
    type: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        default: null
    },
    urlID: {
        type: String,
        default: null
    },
    userID: {
        type: String,
        default: null
    },
    companyID: {
        type: String,
        default: null
    },
    shortURL: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: new Date()
    },
    listID: {
        type: String,
        default: null
    }
});
exports.default = mongoose_1.model('Event', eventSchema);
//# sourceMappingURL=events.js.map