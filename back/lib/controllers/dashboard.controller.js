"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const events_1 = require("../models/events");
const landing_1 = require("../models/admin/landing");
const companies_users_1 = require("../models/admin/companies_users");
const url_1 = require("../models/url");
const list_1 = require("../models/list");
exports.getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {};
    const userid = req.params.userid;
    const events = yield events_1.default.find({ userID: userid });
    const companiesUsers = yield companies_users_1.default.find({ userid: userid });
    let companies = [];
    companiesUsers.map((comUsers) => {
        companies = [...companies, comUsers.companyid];
    });
    const landings = yield landing_1.default.find({ companyid: companies });
    const lists = yield list_1.default.find({ companyID: companies });
    const urls = yield url_1.default.find({ companyID: companies });
    response['events'] = events;
    response['landings'] = landings;
    response['lists'] = lists;
    response['urls'] = urls;
    return res.status(200).json({
        message: '',
        data: response
    });
});
//# sourceMappingURL=dashboard.controller.js.map