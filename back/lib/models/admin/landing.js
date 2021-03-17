"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const landingSchema = new mongoose_1.Schema({
    companyid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    backgroundName: {
        type: String,
    },
    backgroundURL: {
        type: String
    },
    backgroundColor: {
        type: String
    },
    logoName: {
        type: String
    },
    logoURL: {
        type: String
    },
    widthLogo: {
        type: Number
    },
    opacity: {
        type: Number
    },
    validationRut: {
        type: Boolean
    },
    validationRutDigits: {
        type: Number
    },
    elements: {
        type: Array
    },
    date: {
        type: Date,
        default: new Date()
    }
});
exports.default = mongoose_1.model('Landing', landingSchema);
//# sourceMappingURL=landing.js.map