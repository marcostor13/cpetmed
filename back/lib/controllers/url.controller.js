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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delURL = exports.delList = exports.getURLsBYListID = exports.getURLsBYCode = exports.getURLsBYCompanyIDAndCode = exports.getURLsBYCompanyID = exports.getByID = exports.getURLsBYUserID = exports.getListsBYUserID = exports.issetCompanyNameAndText = exports.saveList = exports.saveMultipleURL = exports.saveURL = void 0;
const url_1 = require("../models/url");
const companies_users_1 = require("../models/admin/companies_users");
const list_1 = require("../models/list");
const lodash_1 = require("lodash");
const title = 'URL';
const domain = 'http://localhost:4200';
// const domain = 'https://binter.ml'
const ramdomName = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
const issetCompanyNameRamdom = (res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = false;
    let text = ramdomName(5);
    for (let i = 0; i < 10; i++) {
        yield url_1.default.find({ text }, (err, event) => {
            if (err) {
                res.status(501).json({
                    message: `Error al obtener ${title}s`,
                    data: null
                });
            }
            if (!event || event.length === 0) {
                response = text;
            }
            else {
                text = ramdomName(5);
            }
        });
        if (response) {
            break;
        }
    }
    return response;
});
exports.saveURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { _id } = _a, reqBody = __rest(_a, ["_id"]);
    if (!reqBody.text) {
        reqBody.text = lodash_1.cloneDeep(yield issetCompanyNameRamdom(res));
    }
    let shortURL = '';
    //GET shortURL 
    if (reqBody.companyName) {
        shortURL = `${domain}/${reqBody.companyName}/${reqBody.text}`;
    }
    else {
        shortURL = `${domain}/${reqBody.text}`;
    }
    let urlRedirect = '';
    //GET URL
    switch (reqBody.typeURL) {
        case 'URL':
            urlRedirect = reqBody.url;
            console.log('URL', reqBody.url);
            break;
        case 'Landing':
            urlRedirect = `${domain}/landings/${reqBody.landingID}`;
            break;
        case 'Whatsapp':
            reqBody.whatsappNumber = reqBody.whatsappNumber.replace('+', reqBody.whatsappNumber);
            urlRedirect = `https://wa.me/${reqBody.whatsappNumber}?text=${encodeURI(reqBody.whatsappText)}`;
            break;
        case 'FromFile':
            break;
        default:
            res.status(501).json({
                message: `Error al obtener el tipo de url`,
                data: null
            });
            break;
    }
    const params = {};
    reqBody.parameters.map((param) => {
        params[param.name] = param.value;
    });
    //SAVE URL
    const payload = {
        code: reqBody.text.toLowerCase(),
        companyName: reqBody.companyName.toLowerCase(),
        longURL: urlRedirect,
        shortUrl: shortURL,
        companyID: reqBody.companyID,
        landingID: reqBody.landingID,
        typeURL: reqBody.typeURL,
        parameters: params
    };
    const newURL = new url_1.default(payload);
    yield newURL.save();
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newURL
    });
});
exports.saveMultipleURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { _id } = _b, reqBody = __rest(_b, ["_id"]);
    const newList = new list_1.default({
        name: reqBody.listName,
        companyID: reqBody.companyID
    });
    const list = yield newList.save();
    let urlRedirect = '';
    //GET URL
    switch (reqBody.typeURL) {
        case 'URL':
            urlRedirect = reqBody.url;
            break;
        case 'Landing':
            urlRedirect = `${domain}/landings/${reqBody.landingID}`;
            break;
        case 'Whatsapp':
            reqBody.whatsappNumber = reqBody.whatsappNumber.replace('+', reqBody.whatsappNumber);
            urlRedirect = `https://wa.me/${reqBody.whatsappNumber}?text=${encodeURI(reqBody.whatsappText)}`;
            break;
        case 'FromFile':
            break;
        default:
            res.status(501).json({
                message: `Error al obtener el tipo de url`,
                data: null
            });
            break;
    }
    yield reqBody.dataExcel.map((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (reqBody.typeURL === 'FromFile') {
            urlRedirect = data[reqBody.fieldURL.name];
        }
        reqBody.text = lodash_1.cloneDeep(yield issetCompanyNameRamdom(res));
        let shortURL = '';
        //GET shortURL 
        if (reqBody.companyName) {
            shortURL = `${domain}/${reqBody.companyName}/${reqBody.text}`;
        }
        else {
            shortURL = `${domain}/${reqBody.text}`;
        }
        const params = {};
        reqBody.parameters.map((param) => {
            params[param.name] = data[param.name];
        });
        const payload = {
            code: reqBody.text.toLowerCase(),
            companyName: reqBody.companyName.toLowerCase(),
            longURL: urlRedirect,
            shortUrl: shortURL,
            companyID: reqBody.companyID,
            typeURL: reqBody.typeURL,
            landingID: reqBody.landingID,
            parameters: params,
            listID: list._id,
            listName: list.name
        };
        const newURL = new url_1.default(payload);
        yield newURL.save();
    }));
    return res.status(200).json({
        message: `${title} Cread@`,
        data: list._id
    });
});
exports.saveList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _c = req.body, { _id } = _c, reqBody = __rest(_c, ["_id"]);
    const newEvent = new list_1.default(reqBody);
    yield newEvent.save();
    return res.status(200).json({
        message: `${title} Cread@`,
        data: newEvent
    });
});
exports.issetCompanyNameAndText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, text } = req.body;
    let query;
    if (companyName) {
        query = { companyName: companyName.toLowerCase(), code: text.toLowerCase() };
    }
    else {
        query = { code: text.toLowerCase() };
    }
    url_1.default.find(query, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            });
        }
        console.log(event);
        res.status(200).json({
            message: '',
            data: event
        });
    });
});
exports.getListsBYUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    companies_users_1.default.find({ userid: req.params.userID }, (err, event) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            });
        }
        if (event.length > 0) {
            let companies = [];
            event.map((companies_user) => __awaiter(void 0, void 0, void 0, function* () {
                companies = [...companies, companies_user.companyid];
            }));
            yield list_1.default.find({ companyID: companies }, (err, event) => {
                if (err) {
                    res.status(501).json({
                        message: `Error al obtener ${title}s`,
                        data: null
                    });
                }
                res.status(200).json({
                    message: '',
                    data: event
                });
            });
        }
        else {
            res.status(200).json({
                message: '',
                data: event
            });
        }
    }));
});
exports.getURLsBYUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    companies_users_1.default.find({ userid: req.params.userID }, (err, event) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            });
        }
        if (event.length > 0) {
            let companies = [];
            event.map((companies_user) => __awaiter(void 0, void 0, void 0, function* () {
                companies = [...companies, companies_user.companyid];
            }));
            console.log('companies', companies);
            yield url_1.default.find({ companyID: companies }, (err, event) => {
                if (err) {
                    res.status(501).json({
                        message: `Error al obtener ${title}s`,
                        data: null
                    });
                }
                res.status(200).json({
                    message: '',
                    data: event
                });
            });
        }
        else {
            res.status(200).json({
                message: '',
                data: event
            });
        }
    }));
});
exports.getByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    url_1.default.find({ _id: req.params.id }, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            });
        }
        res.status(200).json({
            message: '',
            data: event
        });
    });
});
exports.getURLsBYCompanyID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    url_1.default.find({ companyID: req.params.companyID }, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            });
        }
        res.status(200).json({
            message: '',
            data: event
        });
    });
});
exports.getURLsBYCompanyIDAndCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    url_1.default.find({ companyName: req.params.companyID.toLowerCase(), code: req.params.code.toLowerCase() }, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            });
        }
        res.status(200).json({
            message: '',
            data: event
        });
    });
});
exports.getURLsBYCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    url_1.default.find({ code: req.params.code.toLowerCase() }, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}s`,
                data: null
            });
        }
        res.status(200).json({
            message: '',
            data: event
        });
    });
});
exports.getURLsBYListID = (req, res) => {
    url_1.default.find({ listID: req.params.listID }, (err, event) => {
        if (err) {
            res.status(501).json({
                message: `Error al obtener ${title}`,
                data: null
            });
        }
        res.status(200).json({
            message: '',
            data: event
        });
    });
};
exports.delList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield url_1.default.remove({ listID: req.params.listID }, (err) => {
        if (err) {
            res.status(501).json({
                message: `Error al eliminar ${title}`,
                data: null
            });
        }
    });
    yield list_1.default.remove({ _id: req.params.listID }, (err) => {
        if (err) {
            res.status(501).json({
                message: `Error al eliminar ${title}`,
                data: null
            });
        }
    });
    return res.status(200).json({
        message: `${title} eliminad@`,
        data: null
    });
});
exports.delURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield url_1.default.remove({ _id: req.params.urlID }, (err) => {
        if (err) {
            res.status(501).json({
                message: `Error al eliminar ${title}`,
                data: null
            });
        }
    });
    return res.status(200).json({
        message: `${title} eliminad@`,
        data: null
    });
});
//# sourceMappingURL=url.controller.js.map