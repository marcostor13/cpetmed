"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    inactive: {
        type: Boolean,
        required: true,
    }
});
exports.default = mongoose_1.model('Calendar', eventSchema);
//# sourceMappingURL=calendar.js.map