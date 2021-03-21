"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    specialtyid: {
        type: String,
        default: null
    },
    specialty: {
        type: String,
        default: null
    },
    doctorid: {
        type: String,
        default: null
    },
    doctor: {
        type: String,
        default: null
    },
    date: {
        type: String,
        default: null
    },
    hour: {
        type: String,
        default: null
    },
    dataUser: {
        type: Object,
        default: null
    },
    createdAt: {
        type: String,
        default: new Date()
    },
});
exports.default = mongoose_1.model('Appointment', eventSchema);
//# sourceMappingURL=appointment.js.map