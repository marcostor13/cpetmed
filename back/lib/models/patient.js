"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: Object,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    dni: {
        type: String,
        default: null
    }
});
exports.default = mongoose_1.model('Patient', eventSchema);
//# sourceMappingURL=patient.js.map