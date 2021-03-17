"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const listSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    companyID: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date()
    }
});
exports.default = mongoose_1.model('List', listSchema);
//# sourceMappingURL=list.js.map