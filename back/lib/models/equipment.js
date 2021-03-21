"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    name: {
        type: String,
        default: null
    },
});
exports.default = mongoose_1.model('Equipment', eventSchema);
//# sourceMappingURL=equipment.js.map