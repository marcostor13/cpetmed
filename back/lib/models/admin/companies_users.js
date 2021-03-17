"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const companiesUsersSchema = new mongoose_1.Schema({
    userid: {
        type: String,
        required: true,
    },
    companyid: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.model('CompaniesUsers', companiesUsersSchema);
//# sourceMappingURL=companies_users.js.map