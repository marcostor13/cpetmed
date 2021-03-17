"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const companySchema = new mongoose_1.Schema({
    legalname: {
        type: String,
        required: true,
    },
    comercialname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date()
    }
});
exports.default = mongoose_1.model('Company', companySchema);
//# sourceMappingURL=company.js.map